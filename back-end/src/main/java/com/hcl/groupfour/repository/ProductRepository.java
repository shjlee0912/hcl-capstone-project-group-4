package com.hcl.groupfour.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hcl.groupfour.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long>, ProductRepositoryFiltered{
	
	//Search product by its name
	List<Product> findByName(String name);
	
	//Search products with name containing input 'name'
	List<Product> findByNameContaining(String name);
	
	//Search product having (this.price <= price)
	List<Product> findByPriceLessThanEqual(float price);
	
	//Search product having (this.price >= price)
	List<Product> findByPriceGreaterThanEqual(float price);
	
	//Search product having (price_1 <= this.price <= price_2)
	List<Product> findByPriceBetween(float price1, float price2);
	
	//Sort products by price ascending
	List<Product> findByOrderByPrice();
	
	//Sort products by price descending
	List<Product> findByOrderByPriceDesc();

}
