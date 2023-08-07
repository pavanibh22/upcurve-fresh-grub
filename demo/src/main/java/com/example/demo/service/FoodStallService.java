package com.example.demo.service;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.entities.FoodStall;
import com.example.demo.repositories.FoodStallRepository;
import com.example.demo.responses.FoodStallResponse;

@Service
public class FoodStallService {
	
	    private final MongoTemplate mongoTemplate;
	    
	    @Autowired
		FoodStallRepository foodStallRepo;

	    //dependency injection
	    public FoodStallService(MongoTemplate mongoTemplate) {
	        this.mongoTemplate = mongoTemplate;
	    }
	    

		public ResponseEntity<FoodStallResponse> getAllStalls() {
			FoodStallResponse response = new FoodStallResponse();
			response.setMessage("Successfully fetched");
			response.setSuccess(true);
			List<FoodStall> foodStalls = mongoTemplate.findAll(FoodStall.class);
			response.setFoodStalls(foodStalls);
		    return ResponseEntity.ok(response);
		}
		
	    
	    public ResponseEntity<FoodStallResponse> createFoodStall(FoodStall foodStall){
	    	
	    	FoodStallResponse response = new FoodStallResponse();
	    	Optional<FoodStall> existingFoodStall = foodStallRepo.findOneByStallName(foodStall.getStallName());
	    	if(existingFoodStall.isPresent())
	    	{
	    		response.setMessage("Food Stall Already Exists by this name");
				response.setSuccess(false);
	    		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
	    	}
	    	
	        FoodStall saved = mongoTemplate.insert(foodStall);
            response.setFoodStalls(Collections.singletonList(saved));
            response.setMessage("Successfully inserted");
			response.setSuccess(true);
            return ResponseEntity.ok(response);

	    }

		public ResponseEntity<FoodStallResponse> deleteFoodStall(String id) {
			Optional<FoodStall> foodStall = foodStallRepo.findById(id);
			FoodStallResponse response = new FoodStallResponse();
			if(foodStall.isPresent())
			{
				foodStallRepo.delete(foodStall.get());
				response.setMessage("Successfully Deleted");
				response.setSuccess(true);
				return ResponseEntity.status(HttpStatus.OK).body(response);
			}
			else
			{
				response.setMessage("Food Stall Not found");
				response.setSuccess(false);
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
			}
		}

		public ResponseEntity<FoodStallResponse> editFoodStall(FoodStall foodStall, String id) {
			
			FoodStallResponse response = new FoodStallResponse();
			Optional<FoodStall> existingFoodStall = foodStallRepo.findById(id);
			if(existingFoodStall.isPresent())
			{
				foodStall.setId(id);
				mongoTemplate.save(foodStall);
				response.setFoodStalls(Collections.singletonList(foodStall));
				response.setMessage("Successfully Updated");
				response.setSuccess(true);
	            return ResponseEntity.ok(response);
			}	
			response.setMessage("Food Stall Not found");
			response.setSuccess(false);
    		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}

		
}
	

