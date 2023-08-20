package com.example.demo.responses;

public class LoginResponse {
	
	String message;
	Boolean status;
	String role;
	String userId;
	
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Boolean getStatus() {
		return status;
	}
	public void setStatus(Boolean status) {
		this.status = status;
	}

	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	
	
	public LoginResponse(String message, Boolean status, String role, String userId) {
		super();
		this.message = message;
		this.status = status;
		this.role = role;
		this.userId = userId;
	}
	@Override
	public String toString() {
		return "LoginResponse [message=" + message + ", status=" + status + ", role=" + role + "]";
	}

	
	

}
