package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

	@Autowired
	private UserRepository userRepository;
	
	@GetMapping("/")
	public List<User> getAllUsers(){
		return userRepository.findAll();
	}
	
	@PostMapping("/")
	public User createUser(@RequestBody User user) {
		System.out.println(user.getEmail());
        return userRepository.save(user);
	}
}
