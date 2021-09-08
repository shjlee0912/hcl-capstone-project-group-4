package com.hcl.groupfour.dto;

import lombok.Data;

@Data
public class PlaceOrderDTO {

	private String token;
		
	private String username;
	
	private long addressId;
	
	private OrderedProductDTO[] items;
	
}
