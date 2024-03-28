package com.kanban.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kanban.backend.entity.Users;

@Repository
public interface UserRepository extends JpaRepository<Users, Integer> {
	
	Optional<Users> findByUsername(String username);
    Optional<Users> findByEmpid(Long empid);
    Optional<Users> findByEmail(String email);
}
