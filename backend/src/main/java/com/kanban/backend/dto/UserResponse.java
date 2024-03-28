package com.kanban.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserResponse {
	
	private int id;
	private String firstname;
	private String lastname;
	private String username;
	private String company;
	private Long empid;
	private String image;
	private String email;
}
