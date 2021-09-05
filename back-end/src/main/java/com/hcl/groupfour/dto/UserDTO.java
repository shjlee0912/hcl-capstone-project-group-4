package com.hcl.groupfour.dto;

import com.hcl.groupfour.model.Address;

import lombok.Data;

@Data
public class UserDTO {
	
	private String username;
	
	private String password;
	
	private String firstName;
	
	private String lastName;
	
	private String phoneNumber;
	
	private String email;
	
	private Address[] addresses;
	
}
