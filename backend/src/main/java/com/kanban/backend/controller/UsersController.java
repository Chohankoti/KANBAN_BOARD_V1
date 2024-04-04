package com.kanban.backend.controller;

import com.kanban.backend.dto.UserRequest;
import com.kanban.backend.dto.UserLogin;
import com.kanban.backend.dto.UserResponse;
import com.kanban.backend.entity.Users;
import com.kanban.backend.service.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
@CrossOrigin("*")
public class UsersController {

    private final UsersService usersService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Map<String, String>> createUser(@RequestBody UserRequest userRequest) {
        return usersService.createUser(userRequest);
    }
    
    
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> userLogin(@RequestBody UserLogin userLogin) {
        return usersService.userLogin(userLogin);
    }


    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<UserResponse> getAllUsers() {
        return usersService.getAllUsers();
    }

    @GetMapping("/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public Object getUserById(@PathVariable int userId) {
        return usersService.getUserById(userId);
    }

    @PutMapping("/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public String updateUser(@PathVariable int userId, @RequestBody Users user) {
        return usersService.updateUser(userId, user);
    }

    @DeleteMapping("/{userId}")
    public String deleteUser(@PathVariable int userId) {
        return usersService.deleteUser(userId);
    }
}
