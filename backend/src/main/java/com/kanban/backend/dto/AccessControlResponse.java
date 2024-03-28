package com.kanban.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class AccessControlResponse {
	
	private int id;
	private long empid;
	private String username;
	private String company;
	private Long ccode;
	private String owner;
	private boolean updateaccess;
	private boolean deleteaccess;
	private boolean createaccess;
}
