package com.example.demo.entities;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartProduct {
	@Id
    private String _id;
	@NotNull
    private String userId;
    private Object item ;
	private int qty;
    private Boolean isOrdered = false;

}
