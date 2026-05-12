# Contributing to Flowkit

First off, thank you for considering contributing to Flowkit! 🎉

It's people like you that make Flowkit such a great tool for teams around the world.

---

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of:
- Age, body size, disability, ethnicity
- Gender identity and expression
- Level of experience, education, socio-economic status
- Nationality, personal appearance, race, religion
- Sexual identity and orientation

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to the project team at **conduct@flowkit.com**. All complaints will be reviewed and investigated promptly and fairly.

---

## 🤝 How Can I Contribute?

### Reporting Bugs

Bugs are tracked as [GitHub issues](https://github.com/yourusername/flowkit/issues). Before creating a bug report, please check existing issues to avoid duplicates.

#### How to Submit a Good Bug Report

**Use a clear and descriptive title** for the issue to identify the problem.

### Provide detailed information:

```markdown
Description
A clear and concise description of what the bug is.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

Expected Behavior
What you expected to happen.

Actual Behavior
What actually happened.

Screenshots
If applicable, add screenshots to help explain your problem.

Environment:
- OS: [e.g., Windows 11, macOS 14, Ubuntu 22.04]
- Browser: [e.g., Chrome 120, Firefox 121, Safari 17]
- Node Version: [e.g., 18.17.0]
- Java Version: [e.g., 17.0.8]
- Flowkit Version: [e.g., 1.0.0]

**Additional Context**
Add any other context about the problem here.
```
## Example:

```
Title: Task creation fails when due date is in the past

Description
When attempting to create a task with a due date that has already passed, the application throws an error instead of showing a validation message.

Steps to Reproduce
1. Navigate to project dashboard
2. Click "Create Task"
3. Fill in task details
4. Set due date to yesterday
5. Click "Create"

Expected Behavior
Show validation error: "Due date cannot be in the past"

Actual Behavior
500 Internal Server Error displayed

Environment:
- OS: macOS 14.1
- Browser: Chrome 120
- Flowkit Version: 1.0.0
```
## Suggesting Features

### Feature suggestions are also tracked as GitHub issues.

How to Submit a Good Feature Request
```Markdown

Title: [Feature Request] Brief description

Problem Statement
Describe the problem this feature would solve. Why is this important?

Proposed Solution
Describe how you envision this feature working.

Alternative Solutions
Have you considered any alternative solutions or features?

Use Cases
Provide specific examples of when and how this would be used.

Mockups/Examples
If applicable, include mockups, screenshots, or links to similar features.

Additional Context
Any other information that might be helpful.
```

### Example:

```Markdown

Title: [Feature Request] Task templates for recurring tasks

Problem Statement
Teams often create similar tasks repeatedly (e.g., weekly status reports, monthly reviews). Manually creating these each time is time-consuming and error-prone.

Proposed Solution
Add a "Save as Template" option when creating tasks. Users could then create new tasks from templates with one click, pre-filling common fields.

Use Cases
- Weekly sprint planning meetings
- Monthly report generation
- Standard onboarding checklists
- Regular code review tasks

Mockups
[Attach screenshots or wireframes]

Additional Context
Similar features exist in Asana and ClickUp.
```

## Your First Code Contribution
Unsure where to begin? Look for issues labeled:

- good first issue - Simple issues perfect for newcomers
- help wanted - Issues where we need community help
- beginner friendly - Low complexity, well-documented issues

Step-by-Step Guide
1. Comment on the issue you want to work on so others know you're working on it
2. Fork the repository to your GitHub account
3. Clone your fork locally:
```Bash

git clone https://github.com/your-username/flowkit.git
cd flowkit
```
4. Create a branch for your feature:
```Bash

git checkout -b feature/your-feature-name
```
5. Make your changes (see Development Setup)
6. Test your changes thoroughly
7. Commit your changes (see Git Commit Messages)
8. Push to your fork:
```Bash

git push origin feature/your-feature-name
```
9.Create a Pull Request from your fork to our main branch

## Pull Requests

### Before Submitting
```
✅ Check that your code follows our style guides
✅ Run all tests and ensure they pass
✅ Update documentation if needed
✅ Add tests for new features
✅ Keep changes focused - one feature/fix per PR
✅ Rebase your branch on latest main to avoid conflicts
```

### PR Template

When creating a PR, please use this template:

```Markdown

## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Code refactoring
- [ ] Performance improvement

## Related Issue
Fixes #(issue number)

## Changes Made
- Change 1
- Change 2
- Change 3

## Screenshots (if applicable)
[Add screenshots here]

## Testing
Describe how you tested your changes:
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing performed

## Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published
```

###  Review Process

1. A maintainer will review your PR within 48-72 hours
2. Address any requested changes
3. Once approved, a maintainer will merge your PR
4. Your contribution will be included in the next release! 🎉

### 💻 Development Setup

#### Prerequisites
Ensure you have installed:

- Node.js (v18+)
- Java JDK (17+)
- Maven (3.8+)
- PostgreSQL (14+)
- Git

#### Initial Setup
```1. Fork and Clone
Bash

# Fork the repo on GitHub, then clone your fork
git clone https://github.com/your-username/flowkit.git
cd flowkit

# Add upstream remote
git remote add upstream https://github.com/original-owner/flowkit.git
2. Database Setup
SQL

-- Create database
CREATE DATABASE flowkit_dev;

-- Create test database
CREATE DATABASE flowkit_test;
3. Backend Setup
Bash

cd backend

# Copy environment template
cp src/main/resources/application.properties.example src/main/resources/application.properties

# Edit with your database credentials
# Then install dependencies and run
mvn clean install
mvn spring-boot:run
Backend runs on: http://localhost:8080

4. Frontend Setup
Bash

cd frontend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env if needed
# Then run dev server
npm run dev
Frontend runs on: http://localhost:5173

Keeping Your Fork Updated
Bash

# Fetch upstream changes
git fetch upstream

# Merge upstream main into your local main
git checkout main
git merge upstream/main

# Push to your fork
git push origin main
```

## 📐 Style Guides

### Git Commit Messages
We follow the Conventional Commits specification.

Format
```

<type>(<scope>): <subject>

<body>

<footer>
Types
feat: New feature
fix: Bug fix
docs: Documentation changes
style: Code style changes (formatting, missing semicolons, etc.)
refactor: Code refactoring (no functional changes)
perf: Performance improvements
test: Adding or updating tests
build: Build system or external dependencies
ci: CI/CD configuration changes
chore: Other changes that don't modify src or test files
```
### Examples
```Bash

# Good commits
feat(auth): add JWT token refresh functionality
fix(tasks): resolve due date validation error
docs(readme): update installation instructions
refactor(api): simplify user service methods
test(projects): add unit tests for project creation

# Bad commits
Update stuff
Fixed bug
WIP
asdfghj
```

### Detailed Example
```text

feat(tasks): add task template functionality

Allow users to save tasks as templates and create new tasks from templates.
This reduces repetitive work for recurring tasks.

- Add template flag to Task model
- Create TemplateService for template operations
- Add API endpoints for template CRUD
- Update UI with "Save as Template" button

Closes #123
```

### Java Style Guide

General Rules
Indentation: 4 spaces (no tabs)
Line length: Maximum 120 characters
Encoding: UTF-8
Use Lombok to reduce boilerplate code

### Naming Conventions
```Java

// Classes: PascalCase
public class TaskService { }

// Methods: camelCase
public Task createTask(TaskDTO taskDTO) { }

// Variables: camelCase
private String userName;
private List<Task> taskList;

// Constants: UPPER_SNAKE_CASE
private static final int MAX_RETRY_ATTEMPTS = 3;

// Packages: lowercase
package com.flowkit.service;
```

### Code Example
```Java

package com.flowkit.service;

import com.flowkit.model.Task;
import com.flowkit.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service class for managing tasks.
 * 
 * @author Flowkit Team
 * @version 1.0
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class TaskService {
    
    private final TaskRepository taskRepository;
    
    /**
     * Creates a new task in the system.
     *
     * @param taskDTO the task data transfer object
     * @return the created task
     * @throws ResourceNotFoundException if project not found
     */
    @Transactional
    public Task createTask(TaskDTO taskDTO) {
        log.info("Creating task with title: {}", taskDTO.getTitle());
        
        // Validate input
        validateTaskDTO(taskDTO);
        
        // Build entity
        Task task = Task.builder()
                .title(taskDTO.getTitle())
                .description(taskDTO.getDescription())
                .status(TaskStatus.TODO)
                .build();
        
        // Save and return
        Task savedTask = taskRepository.save(task);
        log.info("Task created successfully with ID: {}", savedTask.getId());
        
        return savedTask;
    }
    
    private void validateTaskDTO(TaskDTO taskDTO) {
        if (taskDTO.getTitle() == null || taskDTO.getTitle().trim().isEmpty()) {
            throw new BadRequestException("Task title cannot be empty");
        }
    }
}
```
### Best Practices

Use @Slf4j for logging
Use @RequiredArgsConstructor for dependency injection
Add Javadoc for public methods
Keep methods small and focused
Use meaningful variable names
Handle exceptions appropriately

### JavaScript Style Guide

General Rules
Indentation: 2 spaces
Line length: Maximum 100 characters
Quotes: Single quotes for strings
Semicolons: Required
Use ES6+ features

### Naming Conventions
```JavaScript

// Components: PascalCase
const TaskCard = () => { };

// Functions/Variables: camelCase
const handleSubmit = () => { };
const userName = 'John';

// Constants: UPPER_SNAKE_CASE
const API_BASE_URL = 'http://localhost:8080';

// Files: kebab-case
// task-card.jsx, user-service.js
```

### Code Example
```JavaScript

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { taskService } from '../api/taskService';
import Button from '../components/common/Button';

/**
 * TaskForm component for creating and editing tasks.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.task - Task to edit (optional)
 * @param {Function} props.onSave - Callback after save
 */
const TaskForm = ({ task, onSave }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    priority: task?.priority || 'MEDIUM'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (formData.title.length > 200) {
      newErrors.title = 'Title must be less than 200 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const savedTask = task
        ? await taskService.update(task.id, formData)
        : await taskService.create(formData);
      
      onSave?.(savedTask);
      navigate('/tasks');
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium">
          Title *
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300"
          disabled={isLoading}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300"
          disabled={isLoading}
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        loading={isLoading}
      >
        {task ? 'Update Task' : 'Create Task'}
      </Button>
    </form>
  );
};

export default TaskForm;
```

#### Best Practices

- Use functional components with hooks
- Prefer const over let, avoid var
- Use destructuring for props and state
- Use optional chaining (?.) and nullish coalescing (??)
- Keep components small and focused
-Extract reusable logic into custom hooks
- Use PropTypes or TypeScript for type checking
- 
###   📂 Project Structure
Understanding the project structure helps you know where to make changes:

```

flowkit/
├── frontend/
│   └── src/
│       ├── components/    # Reusable UI components
│       ├── pages/         # Page-level components
│       ├── api/           # API service layer
│       ├── store/         # State management
│       └── utils/         # Helper functions
│
└── backend/
    └── src/main/java/com/flowkit/
        ├── controller/    # REST endpoints
        ├── service/       # Business logic
        ├── repository/    # Data access
        ├── model/         # Entity classes
        └── security/      # Auth & security
```

### Where to Add New Features
| Feature Type	| Frontend Location	| Backend Location |
|---------------|-------------------|------------------|
| New page |	src/pages/	| - |
| New component	| src/components/	| - |
| API endpoint	| src/api/	| controller/ |
| Business logic	| -	| service/ |
| Database entity	| -	| model/ |
| Auth logic	| -	| security/ |

### 🧪 Testing Guidelines
Backend Testing
```Bash

# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=TaskServiceTest

# Run with coverage
mvn test jacoco:report
```
Writing Tests
```Java

@SpringBootTest
@AutoConfigureMockMvc
class TaskServiceTest {
    
    @Autowired
    private TaskService taskService;
    
    @MockBean
    private TaskRepository taskRepository;
    
    @Test
    @DisplayName("Should create task successfully")
    void shouldCreateTask() {
        // Given
        TaskDTO taskDTO = TaskDTO.builder()
                .title("Test Task")
                .description("Test Description")
                .build();
        
        Task expectedTask = Task.builder()
                .id(1L)
                .title("Test Task")
                .build();
        
        when(taskRepository.save(any(Task.class))).thenReturn(expectedTask);
        
        // When
        Task result = taskService.createTask(taskDTO);
        
        // Then
        assertNotNull(result);
        assertEquals("Test Task", result.getTitle());
        verify(taskRepository, times(1)).save(any(Task.class));
    }
}
```

Frontend Testing
```Bash

# Run tests
npm test

# Run with coverage
npm run test:coverage

# Run in watch mode
npm test -- --watch
```
Writing Tests
```JavaScript

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TaskForm from './TaskForm';
import { taskService } from '../api/taskService';

// Mock API service
vi.mock('../api/taskService');

describe('TaskForm', () => {
  it('should render form fields', () => {
    render(<TaskForm />);
    
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  });

  it('should show validation error for empty title', async () => {
    render(<TaskForm />);
    
    const submitButton = screen.getByRole('button', { name: /create task/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/title is required/i)).toBeInTheDocument();
    });
  });

  it('should call onSave after successful submission', async () => {
    const mockOnSave = vi.fn();
    taskService.create.mockResolvedValue({ id: 1, title: 'Test' });
    
    render(<TaskForm onSave={mockOnSave} />);
    
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'New Task' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /create task/i }));
    
    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalled();
    });
  });
});
```

## 📚 Documentation

### Code Documentation

- Add Javadoc for all public Java methods
- Add JSDoc for complex JavaScript functions
- Include usage examples in documentation
- Keep README.md updated with new features

### API Documentation

When adding new API endpoints, update /docs/api/:

```Markdown

## Create Task

Creates a new task in the system.

**Endpoint:** `POST /api/tasks`

**Auth Required:** Yes

**Request Body:**
\`\`\`json
{
  "title": "Design landing page",
  "description": "Create mockups",
  "projectId": 1,
  "priority": "HIGH"
}
\`\`\`

**Success Response:**
- **Code:** 201 CREATED
- **Content:**
\`\`\`json
{
  "id": 1,
  "title": "Design landing page",
  "status": "TODO",
  "createdAt": "2024-01-15T10:30:00Z"
}
\`\`\`

**Error Response:**
- **Code:** 400 BAD REQUEST
- **Content:** `{ "error": "Title is required" }`
```

### 👥 Community

#### Getting Help

- GitHub Discussions: Ask questions and share ideas
- Discord: Real-time chat with the community (coming soon)
- Stack Overflow: Tag questions with flowkit

#### Recognition
Contributors will be recognized in:

- CONTRIBUTORS.md file
- Release notes
- Project README
- Annual contributor spotlight
- 
#### Levels of Contribution

- 🌱 First-time Contributor: Made your first PR
- 🌿 Regular Contributor: 5+ merged PRs
- 🌳 Core Contributor: 20+ merged PRs or significant features
- 🏆 Maintainer: Trusted with review and merge permissions

### 🎉 Thank You!
Every contribution, no matter how small, makes a difference. Whether it's:

- Fixing a typo in documentation
- Reporting a bug
- Suggesting a feature
- Writing code
- Reviewing PRs
- Helping others in discussions
- You're making Flowkit better for everyone! 💙

### 📞 Questions?
If you have questions about contributing, feel free to:

- Open a GitHub Discussion
- Email us at contribute@flowkit.com
- Join our Discord community (coming soon)

---

<div align="center">
Happy Contributing! 🚀

Back to README • View Issues • Join Discussions

</div>
