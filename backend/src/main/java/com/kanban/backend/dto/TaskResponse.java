package com.kanban.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class TaskResponse {
	
	private int id;
	private Long ccode;
	private String title;
	private String category;
	private String deadline;
	private String tag;
	private String priority;

}
