package com.kanban.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kanban.backend.entity.Users;

public interface UserRepository extends JpaRepository<Users, Integer> {

}
