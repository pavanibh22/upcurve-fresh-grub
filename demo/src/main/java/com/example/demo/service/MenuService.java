package com.example.demo.service;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.entities.FoodStall;
import com.example.demo.entities.Menu;
import com.example.demo.repositories.MenuRepository;
import com.example.demo.responses.MenuResponse;

@Service
public class MenuService {


	private final MongoTemplate mongoTemplate;

	@Autowired
	MenuRepository menuRepository;

	public MenuService(MongoTemplate mongoTemplate) {
		this.mongoTemplate = mongoTemplate;
	}
	public ResponseEntity<MenuResponse> addMenuItem(Menu menuItem) {

		MenuResponse response = new MenuResponse();

		Optional<Menu> existingMenu= menuRepository.findOneByMenuItemName(menuItem.getMenuItemName());
		if(existingMenu.isPresent())
		{
			response.setMessage("Food Item Already Exists");
    		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}

		 mongoTemplate.insert(menuItem);

         response.setMenuItems(Collections.singletonList(menuItem));
         response.setMessage("Successfully inserted");

         return ResponseEntity.ok(response);
	}

	public ResponseEntity<MenuResponse> getMenuItems(String foodStallId) {
		List<Menu> menuItems = menuRepository.findMenuItemsByStallName(foodStallId);
		MenuResponse response = new MenuResponse();

		if (menuItems.isEmpty()) {
			response.setMessage("No Menu Items Found");
			response.setSuccess(false);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

		response.setMenuItems(menuItems);
		response.setMessage("Menu Items Found");
		response.setSuccess(true);

        return ResponseEntity.ok(response);
	}

	public ResponseEntity<MenuResponse> editMenuItem(Menu menuItem, String id) {
		MenuResponse response = new MenuResponse();

		Optional<Menu> existingMenu= menuRepository.findById(id);
		if(existingMenu.isEmpty())
		{
			response.setMessage("Food Item Not found");
			response.setSuccess(false);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
		menuItem.setId(id);
		Menu saved = menuRepository.save(menuItem);
		response.setMenuItems(Collections.singletonList(saved));
		response.setMessage("Successfully Updated");
		response.setSuccess(true);
		return ResponseEntity.ok(response);
	}

	public ResponseEntity<MenuResponse> deleteMenuItem(String id) {
		Optional<Menu> menuItem = menuRepository.findById(id);
		MenuResponse response = new MenuResponse();
		if(menuItem.isPresent())
		{
			menuRepository.deleteById(id);
			response.setMessage("Menu Item Deleted");
			response.setSuccess(true);
			return ResponseEntity.ok(response);
		}
		else
		{
			response.setMessage("Menu Item Not Found");
			response.setSuccess(false);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}


}
