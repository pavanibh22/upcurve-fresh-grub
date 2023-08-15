package com.example.demo.services;

import java.util.Collections;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Cart;
import com.example.demo.repositories.CartRepo;
import com.example.demo.responses.CartResponse;


@Service
public class CartService {
	private final MongoTemplate mongoTemplate;
	
	@Autowired
	CartRepo cartRepo;
	
	public CartService(MongoTemplate mongoTemplate) {
		this.mongoTemplate = mongoTemplate;
	}

	public ResponseEntity<CartResponse> addCartItem(String userId, String itemId, int qty, Boolean isOrdered) 
	{
		CartResponse response = new CartResponse();
		Optional<Cart> existingCart= cartRepo.findOneByItemId(itemId);
		if(existingCart.isPresent()) 
		{

			Query query = new Query();
			query.addCriteria(Criteria.where("itemId").is(itemId));
			Cart cartItem = mongoTemplate.findOne(query,Cart.class);
			int oldQty = cartItem.getQty();
			int newQty = oldQty + 1;
			cartItem.setQty(newQty);
			cartRepo.save(cartItem);
			response.setCartItems(Collections.singletonList(cartItem));
			response.setMessage("Successfully Updated Quantity");
			return ResponseEntity.ok(response);
		}
		Cart cartItem = new Cart();
		cartItem.setUserId(userId);
		cartItem.setItemId(itemId);
		cartItem.setQty(qty);
		cartItem.setIsOrdered(isOrdered);
		
		mongoTemplate.insert(cartItem);
		response.setCartItems(Collections.singletonList(cartItem));
		response.setMessage("Successfully inserted");

		return ResponseEntity.ok(response);
	}
	public ResponseEntity<CartResponse> removeCartItem(String userId, String itemId) 
	{
		CartResponse response = new CartResponse();
		Optional<Cart> existingCart= cartRepo.findOneByItemId(itemId);
		if(existingCart.isPresent()) 
		{

			Query query = new Query();
			query.addCriteria(Criteria.where("itemId").is(itemId));
			Cart cartItem = mongoTemplate.findOne(query,Cart.class);
			int oldQty = cartItem.getQty();
			if(oldQty>1)//decrement the quantity
			{
				int newQty = oldQty - 1;
				cartItem.setQty(newQty);
				cartRepo.save(cartItem);
				response.setMessage("Successfully Updated Quantity");
				return ResponseEntity.ok(response);
			}
			else if(oldQty == 1)//remove the item document from the collection
			{
				cartRepo.delete(cartItem);
				response.setMessage("Successfully removed item");
				return ResponseEntity.ok(response);
			}
			else
			{
				response.setMessage("Item is not in the cart");
				return ResponseEntity.ok(response);
			}

		}
		response.setMessage("Item not in cart");
		return ResponseEntity.ok(response);
		
	}
}
