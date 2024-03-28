package com.kanban.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kanban.backend.entity.AccessControl;

@Repository
public interface AccessControlRepository extends JpaRepository<AccessControl, Integer>{

}
