package com.kanban.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kanban.backend.entity.AccessControl;

public interface AccessControlRepository extends JpaRepository<AccessControl, Integer>{

}
