package com.example.demo.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

import com.example.demo.dto.LoginDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepo;
import com.example.demo.response.LoginResponse;
import com.example.demo.service.UserService;

@Service
public class UserImpl implements UserService{
	
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public String addUser(UserDTO userDto) {
		
		User user = new User(
				userDto.get_id(),
				userDto.getFirstName(),
				userDto.getLastName(),
				userDto.getEmail(),
				userDto.getMobileNumber(),
				this.passwordEncoder.encode(userDto.getPassword()),
				userDto.getRole(),
				userDto.getVendorId()
				
		);
		
		userRepo.save(user);
		return user.getFirstName();
	}
	

	@Override
	public LoginResponse loginUser(LoginDTO loginDto) {
		String msg = "";
		User user1 = userRepo.findByEmail(loginDto.getEmail());
		if(user1 != null) {
			String password = loginDto.getPassword();
			String encodedPassword = user1.getPassword();
			Boolean isPwdRight = passwordEncoder.matches(password,  encodedPassword);
			if(isPwdRight) {
				Optional<User> user = userRepo.findOneByEmailAndPassword(loginDto.getEmail(), encodedPassword);
				if(user.isPresent()) {
					return new LoginResponse( "Login Success ",true, user1.getRole());
				}else {
					return new LoginResponse("Login Failed" , false, user1.getRole());
				}
				
			}
			else {
				return new LoginResponse("Password Not Match", false, user1.getRole());
				
			}
		}
		else {
			return new LoginResponse("Email not exists", false, null);
		}
	}

}



