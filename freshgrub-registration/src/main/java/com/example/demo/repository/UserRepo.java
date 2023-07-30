package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.entity.User;

public interface UserRepo extends MongoRepository<User, Integer>{

	Optional<User> findOneByEmailAndPassword(String email, String password);
	
	User findByEmail(String email);
	
}
