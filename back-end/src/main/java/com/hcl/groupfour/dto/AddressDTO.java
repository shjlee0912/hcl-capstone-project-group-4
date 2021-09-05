package com.hcl.groupfour.dto;

import lombok.Data;

@Data
public class AddressDTO {
	
	private String firstName;
	
	private String lastName;

	private String streetAddr; //address line 1
	
	private String city;
	
	private String state;
	
	private int zipCode;
	
}
