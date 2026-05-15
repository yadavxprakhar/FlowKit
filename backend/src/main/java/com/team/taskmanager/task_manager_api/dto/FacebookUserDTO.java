package com.team.taskmanager.task_manager_api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FacebookUserDTO {
    private String id;
    private String name;
    private String email;
}
