package com.hcl.groupfour.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hcl.groupfour.dto.AddressDTO;
import com.hcl.groupfour.dto.PlaceOrderDTO;
import com.hcl.groupfour.model.Address;
import com.hcl.groupfour.service.OrderService;
import com.stripe.model.Charge;

@RestController
public class OrderController {

	@Autowired
	OrderService orderService;
	
	@PostMapping("/order")
	public ResponseEntity<Void> placeOrder(@RequestBody PlaceOrderDTO order, Principal principal) {
		try {
			Charge charge = orderService.makePayment(order, principal.getName());
			return ResponseEntity.ok(null);
		} catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(500).build(); //more status codes should be added later
		}
	}
	
	@PostMapping("/shipping_address") 
	public ResponseEntity<Address> createShippingAddress(@RequestBody AddressDTO address) {
		return ResponseEntity.ok(orderService.createAddress(address));
		
	}
	
}
