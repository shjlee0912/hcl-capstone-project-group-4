package com.hcl.groupfour.model;

import java.io.Serializable;

import lombok.Data;

@Data
public class OrderItemId implements Serializable{

	private Long order;
	
	private Long product;
	
}
