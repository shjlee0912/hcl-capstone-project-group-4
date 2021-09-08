package com.hcl.groupfour.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hcl.groupfour.model.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long>{
	
}
