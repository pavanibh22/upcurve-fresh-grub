package com.example.demo.dto;

public class UserDTO {
	private String _id;
	private String firstName;
	private String lastName;
	private String email;
	private long mobileNumber;
	private String password;
	private String role;
	private String vendorId;
	public UserDTO(String _id, String firstName, String lastName, String email, long mobileNumber, String password,
			String role, String vendorId) {
		super();
		this._id = _id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.mobileNumber = mobileNumber;
		this.password = password;
		this.role = role;
		this.vendorId = vendorId;
	}
	
	public String get_id() {
		return _id;
	}


	public void set_id(String _id) {
		this._id = _id;
	}


	public String getFirstName() {
		return firstName;
	}


	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}


	public String getLastName() {
		return lastName;
	}


	public void setLastName(String lastName) {
		this.lastName = lastName;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public long getMobileNumber() {
		return mobileNumber;
	}


	public void setMobileNumber(long mobileNumber) {
		this.mobileNumber = mobileNumber;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public String getRole() {
		return role;
	}


	public void setRole(String role) {
		this.role = role;
	}


	public String getVendorId() {
		return vendorId;
	}


	public void setVendorId(String vendorId) {
		this.vendorId = vendorId;
	}


	@Override
	public String toString() {
		return "UserDTO [_id=" + _id + ", firstName=" + firstName + ", lastName=" + lastName + ", email=" + email
				+ ", mobileNumber=" + mobileNumber + ", password=" + password + ", role=" + role + ", vendorID="
				+ vendorId + "]";
	}


	public UserDTO()
	{}	
	

}
