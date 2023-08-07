package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.Menu;
import com.example.demo.responses.MenuResponse;
import com.example.demo.service.MenuService;

@RestController
@RequestMapping("/menu/{foodStallId}")
public class MenuController {

	 @Autowired
	 MenuService menuService;

	 @PostMapping("/create")
	 public ResponseEntity<MenuResponse> createMenuItem(@RequestBody Menu menuItem){
		 return menuService.addMenuItem(menuItem);
	 }

	 @GetMapping("")
	 public  ResponseEntity<MenuResponse> getMenuDetails(@PathVariable String foodStallId) {
	       return menuService.getMenuItems(foodStallId);
	 }
	 @PatchMapping("/edit/{id}")
	 public ResponseEntity<MenuResponse> editMenutItem(@RequestBody Menu menuItem, @PathVariable String id) {
		return menuService.editMenuItem(menuItem, id);
	 }

	 @DeleteMapping("/delete/{id}")
	 public ResponseEntity<MenuResponse> deleteMenuItem(@PathVariable String id) {
		 return menuService.deleteMenuItem(id);
	 }
}
