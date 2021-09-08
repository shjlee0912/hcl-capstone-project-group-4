package com.hcl.groupfour.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.hcl.groupfour.dto.AddressDTO;
import com.hcl.groupfour.dto.OrderedProductDTO;
import com.hcl.groupfour.dto.PlaceOrderDTO;
import com.hcl.groupfour.model.Address;
import com.hcl.groupfour.model.Order;
import com.hcl.groupfour.model.OrderItem;
import com.hcl.groupfour.model.Product;
import com.hcl.groupfour.model.User;
import com.hcl.groupfour.repository.AddressRepository;
import com.hcl.groupfour.repository.OrderItemRepository;
import com.hcl.groupfour.repository.OrderRepository;
import com.hcl.groupfour.repository.ProductRepository;
import com.hcl.groupfour.repository.UserRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;

@Component
public class OrderService {

	@Autowired
	UserRepository ur;
	
	@Autowired
	AddressRepository ar;
	
	@Autowired
	private ProductRepository pr;
	
	@Autowired
	private OrderRepository or;
	
	@Autowired
	private OrderItemRepository oir;
	
	public OrderService(@Value("${stripe.key}") String key) {
		Stripe.apiKey = key;
	}
	
	@Transactional
	public Charge makePayment(PlaceOrderDTO orderDTO, String username) throws StripeException {
		String token = orderDTO.getToken();
		User user = ur.findByUsername(username);
		Address address = ar.findById(orderDTO.getAddressId()).get();
		Order order = new Order();
		order.setOrderStatus(Order.OrderStatus.ORDER_PLACED);
		order.setTimeOfOrder(new Date());
		order.setUser(user);
		order.setShippingAddrId(address);
		or.save(order);
		double total = 0;
		for(OrderedProductDTO item: orderDTO.getItems()) {
			Product product = pr.findById(item.getProductId()).get();
			total += product.getPrice() * item.getQuantity();
			OrderItem newItem = new OrderItem();
			newItem.setProductId(pr.getById(item.getProductId()));
			newItem.setOrderId(order.getId());
			newItem.setQuantity(item.getQuantity());
			oir.save(newItem);
		}
		order.setTotal(Double.parseDouble(String.format("%.2f", total)));
		or.save(order);
		Map<String, Object> chargeParams = new HashMap<>();
		chargeParams.put("amount", (int) (total*100));
		chargeParams.put("currency", "USD");
		chargeParams.put("source", token);
		return Charge.create(chargeParams);
	}
	
	public Address createAddress(AddressDTO address) {
		Address newAddress = new Address();
		User user = ur.findByUsername(address.getUsername());
		newAddress.setFirstName(address.getFirstName());
		newAddress.setLastName(address.getLastName());
		newAddress.setStreetAddr(address.getStreetAddr());
		newAddress.setCity(address.getCity());
		newAddress.setState(address.getState());
		newAddress.setZipCode(address.getZipCode());
		newAddress.setUser(user);
		ar.save(newAddress);
		return newAddress;
	}
	
	
}
