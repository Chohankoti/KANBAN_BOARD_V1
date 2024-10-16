package com.kanban.backend.service;

import com.kanban.backend.dto.TaskRequest;
import com.kanban.backend.dto.TaskResponse;
import com.kanban.backend.entity.Tasks;
import com.kanban.backend.repository.TasksRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TasksService {

    private final TasksRepository tasksRepository;


    public String createTask(TaskRequest taskRequest) {
    	Tasks task = Tasks.builder()
				.ccode(taskRequest.getCcode())
				.title(taskRequest.getTitle())
				.category(taskRequest.getCategory())
				.deadline(taskRequest.getDeadline())
				.tag(taskRequest.getTag())
				.priority(taskRequest.getPriority())
				.build();
    	
    	tasksRepository.save(task);
    	return "Task Created Successfully";
    }

    public List<TaskResponse> getAllTasks() 
    {        
    	List<Tasks> tasks = tasksRepository.findAll();
    	return tasks.stream().map(this::mapToTaskResponse).toList();
    }
    
    
    public List<TaskResponse> filterbyccode( Long ccode) {
        return tasksRepository.findByCcode(ccode)
        		.stream()
                .map(task -> TaskResponse.builder()
                        .id(task.getId())
                        .ccode(task.getCcode())
                        .title(task.getTitle())
                        .category(task.getCategory())
                        .deadline(task.getDeadline())
                        .tag(task.getTag())
                        .priority(task.getPriority())
                        .build())
                .collect(Collectors.toList());
    }
    
    private TaskResponse mapToTaskResponse(Tasks task)
    {
    	return TaskResponse.builder()
    					.id(task.getId())
    					.ccode(task.getCcode())
    					.title(task.getTitle())
    					.category(task.getCategory())
    					.deadline(task.getDeadline())
    					.tag(task.getTag())
    					.priority(task.getPriority())
    					.build();
    			
    }
  

    public Object getTaskById(int taskId) {
        Optional<Tasks> optionalTask = tasksRepository.findById(taskId);
        if (optionalTask.isPresent()) {
            return optionalTask.get();
        } else {
            return "Task Not Found";
        }
    }
    
    

    public String updateTask(int taskId, Tasks updatedTask) {
        Optional<Tasks> optionalTask = tasksRepository.findById(taskId);
        if (optionalTask.isPresent()) {
            Tasks existingTask = optionalTask.get();
            existingTask.setCcode(updatedTask.getCcode());
            existingTask.setTitle(updatedTask.getTitle());
            existingTask.setCategory(updatedTask.getCategory());
            existingTask.setDeadline(updatedTask.getDeadline());
            existingTask.setTag(updatedTask.getTag());
            existingTask.setPriority(updatedTask.getPriority());
            tasksRepository.save(existingTask);
            return "Task Updated";
        } else {
            return "Task Not Found";
        }
    }

    public String deleteTask(int taskId) {
        Optional<Tasks> taskOptional = tasksRepository.findById(taskId);
        if (taskOptional.isPresent()) {
            tasksRepository.deleteById(taskId);
            return "Task deleted successfully";
        } else {
            return "Task not found";
        }
    }

}
