package com.example.demo.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.entities.Cart;

public interface CartRepo extends MongoRepository<Cart, String>{
	
	 Optional<Cart> findOneByItemId(String itemId);

}
