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
public class Tasks {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(nullable = false)
	private Long ccode;
	@Column(nullable = false)
	private String title;
	@Column(nullable = false)
	private String category;
	@Column(nullable = false)
	private String deadline;
	@Column(nullable = false)
	private String tag;
	@Column(nullable = false)
	private String priority;
}
