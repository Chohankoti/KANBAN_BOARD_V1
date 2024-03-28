package com.kanban.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class AccessControl {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(nullable = false)
	private long empid;
	@Column(nullable = false)
	private String username;
	@Column(nullable = false)
	private String company;
	@Column(nullable = false)
	private Long ccode;
	@Column(nullable = false)
	private String owner;
	@Column(nullable = false)
	private boolean updateaccess;
	@Column(nullable = false)
	private boolean deleteaccess;
	@Column(nullable = false)
	private boolean createaccess;
	
}
