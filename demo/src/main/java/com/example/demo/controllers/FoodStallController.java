package com.example.demo.controllers;

import com.example.demo.responses.FoodStallResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.FoodStall;
import com.example.demo.service.FoodStallService;

@RestController
@RequestMapping("/foodStall")
public class FoodStallController {
	
	@Autowired
	FoodStallService foodStallService;
	
	@PostMapping("/create")
	public ResponseEntity<FoodStallResponse> createFoodStall(@RequestBody FoodStall foodStall)
	{
		return foodStallService.createFoodStall(foodStall);
	}

	@GetMapping("/getAllStalls")
	public ResponseEntity<FoodStallResponse> getAllFoodStalls()
	{	
		return foodStallService.getAllStalls();
	}
	
	@PostMapping("/delete/{id}")
	public ResponseEntity<FoodStallResponse> deleteFoodStall(@PathVariable String id){
		return foodStallService.deleteFoodStall(id);
	}
	
	@PatchMapping("/edit/{id}")
	public  ResponseEntity<FoodStallResponse> editFoodStall(@RequestBody FoodStall foodStall, @PathVariable String id) {
		return foodStallService.editFoodStall(foodStall, id);
	}
	
	
}
