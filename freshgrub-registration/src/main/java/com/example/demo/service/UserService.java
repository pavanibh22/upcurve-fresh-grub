package com.example.demo.service;

import com.example.demo.dto.LoginDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.response.LoginResponse;

public interface UserService {

	String addUser(UserDTO userDto);

	LoginResponse loginUser(LoginDTO loginDto);

}
