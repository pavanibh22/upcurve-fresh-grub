package com.example.demo.services;

import java.io.IOException;
import java.util.Base64;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

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
	public ResponseEntity<MenuResponse> addMenuItem(String stallName, String menuItemName, int price, MultipartFile image) {

		MenuResponse response = new MenuResponse();
		Optional<Menu> existingMenu= menuRepository.findOneByMenuItemName(menuItemName);
		Menu menuItem = new Menu();
		menuItem.setStallName(stallName);
		if(existingMenu.isPresent()) {
			response.setMessage("Food Item Already Exists");
			response.setSuccess(false);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
		menuItem.setMenuItemName(menuItemName);
		menuItem.setPrice(price);
		if(image!=null && !image.isEmpty()) {
			if(StringUtils.cleanPath(Objects.requireNonNull(image.getOriginalFilename())).contains(".."))
			{
				response.setMessage("Invalid Image");
				response.setSuccess(false);
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
			}
			try {
				menuItem.setMenuItemImage(Base64.getEncoder().encodeToString(image.getBytes()));
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		}else{
			menuItem.setMenuItemImage(null);
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

	public ResponseEntity<MenuResponse> editMenuItem(String id, String stallName, String menuItemName, int price, MultipartFile image) {
		MenuResponse response = new MenuResponse();
		Optional<Menu> existingMenu= menuRepository.findById(id);
		if(existingMenu.isEmpty())
		{
			response.setMessage("Item Not found");
			response.setSuccess(false);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
		//check if the menu item name is already present
		Optional<Menu> existingMenuItem = menuRepository.findOneByMenuItemName(menuItemName);
		if(existingMenuItem.isPresent() && !existingMenuItem.get().getId().equals(id)) {
			response.setMessage("Food Item Already Exists");
			response.setSuccess(false);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
		Menu menuItem = new Menu();
		menuItem.setId(id);
		menuItem.setStallName(stallName);
		menuItem.setMenuItemName(menuItemName);
		menuItem.setPrice(price);
		if(image!=null && !image.isEmpty()) {
			if(StringUtils.cleanPath(Objects.requireNonNull(image.getOriginalFilename())).contains(".."))
			{
				response.setMessage("Invalid Image");
				response.setSuccess(false);
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
			}
			try {
				menuItem.setMenuItemImage(Base64.getEncoder().encodeToString(image.getBytes()));
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		}else{
			menuItem.setMenuItemImage(null);
		}
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
