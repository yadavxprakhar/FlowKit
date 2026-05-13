package com.team.taskmanager.task_manager_api.controller;

import com.team.taskmanager.task_manager_api.model.User;
import com.team.taskmanager.task_manager_api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserRepository userRepository;
    private static final String UPLOAD_DIR = "uploads/profile-pics/";

    @PostMapping("/profile-picture")
    public ResponseEntity<String> uploadProfilePicture(
            @RequestParam("file") MultipartFile file,
            Authentication authentication) throws IOException {
        
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty");
        }

        // Ensure directory exists
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Create unique filename
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath);

        // Update user
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // In a real app, this would be a full URL. For local dev, we'll return the relative path.
        String imageUrl = "/api/v1/users/profile-picture/" + fileName;
        user.setProfilePictureUrl(imageUrl);
        userRepository.save(user);

        return ResponseEntity.ok(imageUrl);
    }

    @GetMapping("/profile-picture/{fileName}")
    public ResponseEntity<byte[]> getProfilePicture(@PathVariable String fileName) throws IOException {
        Path filePath = Paths.get(UPLOAD_DIR).resolve(fileName);
        if (!Files.exists(filePath)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(Files.readAllBytes(filePath));
    }

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(Authentication authentication) {
        return ResponseEntity.ok(userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found")));
    }
}
