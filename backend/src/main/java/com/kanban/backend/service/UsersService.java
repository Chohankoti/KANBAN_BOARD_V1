package com.kanban.backend.service;

import com.kanban.backend.dto.UserRequest;
import com.kanban.backend.dto.UserResponse;
import com.kanban.backend.entity.Users;
import com.kanban.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UsersService {

    private final UserRepository usersRepository;

    public String createUser(UserRequest userRequest) {
        Optional<Users> existingUserByUsername = usersRepository.findByUsername(userRequest.getUsername());
        Optional<Users> existingUserByEmpid = usersRepository.findByEmpid(userRequest.getEmpid());
        Optional<Users> existingUserByEmail = usersRepository.findByEmail(userRequest.getEmail());

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

        if (existingUserByUsername.isPresent() || existingUserByEmpid.isPresent() || existingUserByEmail.isPresent()) {
        	int length = errorMessage.toString().length();
            return errorMessage.toString().substring(0, length-1);
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
        return "User Created";
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
            return "User Not Found";
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
