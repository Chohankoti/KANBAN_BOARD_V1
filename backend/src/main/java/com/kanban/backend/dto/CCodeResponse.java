package com.kanban.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CCodeResponse {
	
	private int id;
	private long ccode;
	private String tag;
	private String owner;
}
