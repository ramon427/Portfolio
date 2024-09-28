package me.github.turtlesoupvevo.java.controller;

import me.github.turtlesoupvevo.java.model.Project;
import me.github.turtlesoupvevo.java.service.ProjectService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public List<Project> getAllProjects() {
        System.out.println("test");
        return projectService.getAllProjects();
    }

    @PostMapping
    public Project addProject(@RequestBody Project project) {
        return projectService.addProject(project);
    }
}