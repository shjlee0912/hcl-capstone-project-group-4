package com.hcl.groupfour.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name="orders")
public class Order {

	public enum OrderStatus {
		ORDER_PLACED,
		ORDER_SHIPPED,
		ORDER_COMPLETED
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@ManyToOne(fetch = FetchType.EAGER)
	private User user;
	
	@ManyToOne(fetch = FetchType.EAGER)
	private Address shippingAddrId;
	
	@ManyToOne(fetch = FetchType.EAGER)
	private PaymentMethod paymentMethod;
	
	private Date timeOfOrder;
	
	private OrderStatus orderStatus;
	
	private double total;
	
 
	
}
