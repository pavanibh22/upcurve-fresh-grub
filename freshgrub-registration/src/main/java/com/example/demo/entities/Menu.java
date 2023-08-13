package com.example.demo.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection="menu_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Menu {

	@Id
	private String id;
	@NotNull
	private String stallId;
	@NotNull
	private String menuItemName;
	@NotNull
	private int price;
	private String menuItemImage;

//	smaple json
//{
//	"stallName": "Pizza Hut",
//	"menuItemName": "Onion Pizza",
//	"price": 350,
//	"menuItemImage": "string"
//}
}
