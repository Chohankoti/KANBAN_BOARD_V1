package com.kanban.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kanban.backend.entity.Tasks;

@Repository
public interface TasksRepository extends JpaRepository<Tasks, Integer>{

}
