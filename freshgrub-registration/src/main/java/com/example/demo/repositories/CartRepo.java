
package com.example.demo.repositories;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.example.demo.entities.Cart;

public interface CartRepo extends MongoRepository<Cart, String>{
	
	 Optional<Cart> findOneByUserIdAndItemId(String userId, String itemId);

	Optional<List<Cart>> findAllByUserId(String userId);

	 @Query("{'userId': ?0, 'itemId': ?1, 'isOrdered': ?2}")
	 Optional<Cart> isCartItem(String userId, String itemId, Boolean notOrdered);
	 
	 Optional<Cart> findOneByItemId(String itemId);
	@Aggregation(pipeline  = {
	"{$match: { userId: ?0}}",
	"{$group: { _id: '', total: {$sum: $qty}}}"
	})
	int sumOfQty(String userId);

	Optional<List<Cart>> findByUserIdAndIsOrderedFalse(String userId);

	Optional<List<Cart>> findByDateAndIsOrderedTrue(LocalDate date);

	Optional<List<Cart>> findByDate(LocalDate date);
}