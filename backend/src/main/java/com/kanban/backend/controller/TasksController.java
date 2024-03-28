package com.kanban.backend.controller;


import com.kanban.backend.entity.Tasks;
import com.kanban.backend.service.TasksService;
import com.kanban.backend.dto.TaskRequest;
import com.kanban.backend.dto.TaskResponse;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/tasks")
public class TasksController {

    private final TasksService tasksService;

    

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public String createTask(@RequestBody TaskRequest taskRequest) {
       return tasksService.createTask(taskRequest);    	
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<TaskResponse> getAllTasks() {
        return tasksService.getAllTasks();
    }

    @GetMapping("/{taskId}")
    @ResponseStatus(HttpStatus.OK)
    public Object getTaskById(@PathVariable int taskId) {
        return tasksService.getTaskById(taskId);
    }

    @PutMapping("/{taskId}")
    @ResponseStatus(HttpStatus.OK)
    public String updateTask(@PathVariable int taskId, @RequestBody Tasks task) {
        return tasksService.updateTask(taskId, task);
    }

    @DeleteMapping("/{taskId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public String deleteTask(@PathVariable int taskId) {
        return tasksService.deleteTask(taskId);
    }
}
