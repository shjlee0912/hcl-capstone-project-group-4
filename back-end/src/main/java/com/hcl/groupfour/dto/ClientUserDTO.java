package com.hcl.groupfour.dto;

import com.hcl.groupfour.model.Address;

import lombok.Data;

@Data
public class ClientUserDTO {
	
	private String username;
		
	private String firstName;
	
	private String lastName;
	
	private String phoneNumber;
	
	private String email;
	
	private Address[] addresses;
	
}
