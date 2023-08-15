package com.example.demo.entities;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Document(collection = "cart")
@NoArgsConstructor
@AllArgsConstructor
public class Cart {
	@Id
    private String _id;
	@NotNull
    private String userId;
	@NotNull
    private String itemId ;
	private int qty;
    private Boolean isOrdered = false;

}
