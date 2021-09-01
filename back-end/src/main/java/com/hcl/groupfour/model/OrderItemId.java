package com.hcl.groupfour.model;

import java.io.Serializable;

import lombok.Data;

@Data
public class OrderItemId implements Serializable{

	private long orderId;
	
	private long productId;
	
}
