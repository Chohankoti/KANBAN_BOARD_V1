package com.kanban.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kanban.backend.entity.AccessControl;
import com.kanban.backend.entity.CCode;

@Repository
public interface AccessControlRepository extends JpaRepository<AccessControl, Integer>{
	List<AccessControl> findByOwner(String owner);
}
