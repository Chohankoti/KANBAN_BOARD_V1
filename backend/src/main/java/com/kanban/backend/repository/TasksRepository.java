package com.kanban.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kanban.backend.entity.Tasks;

public interface TasksRepository extends JpaRepository<Tasks, Integer>{

}
