package com.hcl.groupfour.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.ManyToOne;

import lombok.Data;

@Data
@Entity
@IdClass(OrderItemId.class)
public class OrderItem {
	
	@Id
	@ManyToOne(fetch = FetchType.EAGER)
	private Order order;
	
	@Id
	@ManyToOne(fetch = FetchType.EAGER)
	private Product product;
	
	private int quantity;
	
}
