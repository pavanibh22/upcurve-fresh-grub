package com.example.demo.dto;


import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class MenuPayload {

	private String menuItemName;
	private int price;
	private String menuItemImage;
}
