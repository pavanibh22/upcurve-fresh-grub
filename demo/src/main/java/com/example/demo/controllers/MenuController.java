package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.responses.MenuResponse;
import com.example.demo.service.MenuService;

@RestController
@RequestMapping("/menu/{foodStallId}")
public class MenuController {

	 @Autowired
	 MenuService menuService;

	@PostMapping("/create")
	public ResponseEntity<MenuResponse> createMenuItem(@RequestParam String stallName,
													   @RequestParam String menuItemName,
													   @RequestParam int price,
													   @RequestParam(required = false) MultipartFile image) {
		return menuService.addMenuItem(stallName, menuItemName, price, image);
	}

	 @GetMapping("")
	 public  ResponseEntity<MenuResponse> getMenuDetails(@PathVariable String foodStallId) {
	       return menuService.getMenuItems(foodStallId);
	 }
	 
	 
	@PatchMapping("/edit/{id}")
	public ResponseEntity<MenuResponse> editMenuItem(@PathVariable String id,
													 @RequestParam String stallName,
													 @RequestParam String menuItemName,
													 @RequestParam int price,
													 @RequestParam(required = false) MultipartFile image) {
		return menuService.editMenuItem(id, stallName, menuItemName, price, image);
	}

	 @DeleteMapping("/delete/{id}")
	 public ResponseEntity<MenuResponse> deleteMenuItem(@PathVariable String id) {
		 return menuService.deleteMenuItem(id);
	 }
}
