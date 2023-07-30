package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import com.example.demo.dto.LoginDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepo;
import com.example.demo.response.LoginResponse;
import com.example.demo.service.UserService;

@RestController
@CrossOrigin
@RequestMapping("api/v1/users")
public class UserController {
	
	@Autowired
	private UserService userService;
	@Autowired
	private UserRepo userRepo;
	@PostMapping("/save")
	public String saveUser(@RequestBody UserDTO userDto)
	{
		String id = userService.addUser(userDto);
		return id;
	}
	
	@PostMapping("/login")
	public RedirectView loginUser(@RequestBody LoginDTO loginDto)
	{
		LoginResponse loginResponse = userService.loginUser(loginDto);
		if((loginResponse.getStatus())==true && (loginResponse.getRole().equals("user")))
		{
			RedirectView redirectView = new RedirectView();
			redirectView.setUrl("userhome");
			return redirectView;
		}
		else if((loginResponse.getStatus())==true && (loginResponse.getRole().equals("vendor")))
		{
			RedirectView redirectView = new RedirectView();
			redirectView.setUrl("vendorhome");
			return redirectView;
		}
		RedirectView redirectView = new RedirectView();
		redirectView.setUrl("login");
		return redirectView;

	}
	@PostMapping("/loginOAuth")
	public ResponseEntity<?> loginUserOAuth(@RequestBody LoginDTO logindto)
	{
		
		LoginResponse loginResponse =userService.loginUser(logindto);
		//User e1=userRepo.findByEmail(logindto.getEmail());
		//if(e1!=null)
			return ResponseEntity.ok(loginResponse);
		//else
			//return ResponseEntity.ok(loginResponse);
	}
	@GetMapping("/userhome")
	public String userHome()
	{
		return "Welcome user!";
	}
	@GetMapping("/vendorhome")
	public String vendorHome()
	{
		return "Welcome vendor!";
	}
	

}
