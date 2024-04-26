package com.kanban.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kanban.backend.entity.Tasks;

@Repository
public interface TasksRepository extends JpaRepository<Tasks, Integer>{
	List<Tasks> findByCategoryAndCcode(String category, Long ccode);
	List<Tasks> findByCcode(Long ccode);
}
