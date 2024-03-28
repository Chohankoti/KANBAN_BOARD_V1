package com.kanban.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kanban.backend.entity.CCode;

@Repository
public interface CCodeRepository extends JpaRepository<CCode, Integer>{
	Optional<CCode> findByCcode(long ccode);
}
