package com.kanban.backend.service;

import com.kanban.backend.dto.UserRequest;
import com.kanban.backend.dto.UserResponse;
import com.kanban.backend.dto.UserLogin;
import com.kanban.backend.entity.Users;
import com.kanban.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UsersService {

    private final UserRepository usersRepository;
    
    public ResponseEntity<Map<String, String>> createUser(UserRequest userRequest) {
        Optional<Users> existingUserByUsername = usersRepository.findByUsername(userRequest.getUsername());
        Optional<Users> existingUserByEmpid = usersRepository.findByEmpid(userRequest.getEmpid());
        Optional<Users> existingUserByEmail = usersRepository.findByEmail(userRequest.getEmail());

        Map<String, String> response = new HashMap<>();

        if (existingUserByUsername.isPresent() || existingUserByEmpid.isPresent() || existingUserByEmail.isPresent()) {
            StringBuilder errorMessage = new StringBuilder("User already exists with:");

            if (existingUserByUsername.isPresent()) {
                errorMessage.append(" username,");
            }
            if (existingUserByEmpid.isPresent()) {
                errorMessage.append(" employee id,");
            }
            if (existingUserByEmail.isPresent()) {
                errorMessage.append(" email,");
            }

            int length = errorMessage.length();
            response.put("message", errorMessage.substring(0, length - 1));
            return ResponseEntity.badRequest().body(response);
        }

        Users user = Users.builder()
                .firstname(userRequest.getFirstname())
                .lastname(userRequest.getLastname())
                .username(userRequest.getUsername())
                .company(userRequest.getCompany())
                .empid(userRequest.getEmpid())
                .image(userRequest.getImage())
                .email(userRequest.getEmail())
                .password(userRequest.getPassword())
                .build();

        usersRepository.save(user);
        response.put("message", "User Created");
        return ResponseEntity.ok(response);
    }
    
    public ResponseEntity<Map<String, String>> userLogin(UserLogin userLogin) {
        // Retrieve user by username
        Optional<Users> userOptional = usersRepository.findByUsername(userLogin.getUsername());
        
        // Check if user exists and if the password matches
        if (userOptional.isPresent()) {
            Users user = userOptional.get();
            if (user.getPassword().equals(userLogin.getPassword())) {
                Map<String, String> responseBody = new HashMap<>();
                responseBody.put("message", "Login successful");
                return ResponseEntity.ok(responseBody); 
            } else {
                Map<String, String> responseBody = new HashMap<>();
                responseBody.put("message", "Invalid password");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody); 
            }
        } else {
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("message", "User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseBody);
        }
    }


    public List<UserResponse> getAllUsers() {
        List<Users> users = usersRepository.findAll();
        return users.stream()
                .map(this::mapToUserResponse).toList();
    }

    private UserResponse mapToUserResponse(Users user) {
        return UserResponse.builder()
                .id(user.getId())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .username(user.getUsername())
                .company(user.getCompany())
                .empid(user.getEmpid())
                .image(user.getImage())
                .email(user.getEmail())
                .build();
    }

    public Object getUserById(int userId) {
        Optional<Users> optionalUser = usersRepository.findById(userId);
        if (optionalUser.isPresent()) {
            return optionalUser.get();
        } else {
            return "UserName Not Found";
        }
    }

    public String updateUser(int userId, Users updatedUser) {
        Optional<Users> optionalUser = usersRepository.findById(userId);
        if (optionalUser.isPresent()) {
            Users existingUser = optionalUser.get();

            Optional<Users> existingUserByUsername = usersRepository.findByUsername(updatedUser.getUsername());
            Optional<Users> existingUserByEmpid = usersRepository.findByEmpid(updatedUser.getEmpid());
            Optional<Users> existingUserByEmail = usersRepository.findByEmail(updatedUser.getEmail());

            StringBuilder errorMessage = new StringBuilder("User already exists with:");

            if (existingUserByUsername.isPresent() && existingUserByUsername.get().getId() != userId) {
                errorMessage.append(" username,");
            }

            if (existingUserByEmpid.isPresent() && existingUserByEmpid.get().getId() != userId) {
                errorMessage.append(" empid,");
            }

            if (existingUserByEmail.isPresent() && existingUserByEmail.get().getId() != userId) {
                errorMessage.append(" email,");
            }

            if (errorMessage.length() > "User already exists with:".length()) {
                int length = errorMessage.toString().length();
                return errorMessage.toString().substring(0, length-1);
            }

            existingUser.setFirstname(updatedUser.getFirstname());
            existingUser.setLastname(updatedUser.getLastname());
            existingUser.setUsername(updatedUser.getUsername());
            existingUser.setCompany(updatedUser.getCompany());
            existingUser.setEmpid(updatedUser.getEmpid());
            existingUser.setImage(updatedUser.getImage());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setPassword(updatedUser.getPassword());
            usersRepository.save(existingUser);
            return "User Updated";
        } else {
            return "User Not Found";
        }
    }

    
    public String deleteUser(int userId) {
        Optional<Users> userOptional = usersRepository.findById(userId);
        if (userOptional.isPresent()) {
            usersRepository.deleteById(userId);
            return "User deleted successfully";
        } else {
            return "User not found";
        }
    }
}
