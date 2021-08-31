package com.hcl.groupfour.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hcl.groupfour.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
	
	//Search product by its name
	List<Product> findByName(String name);
	
	//Search product having (this.price <= price)
	List<Product> findByPriceLessThanEqual(float price);
	
	//Search product having (this.price >= price)
	List<Product> findByPriceGreaterThanEqual(float price);
	
	//Search product having (price_1 <= this.price <= price_2)
	List<Product> findByPriceBetween(float price1, float price2);
	
	//Search product having (this.rating <= rating)
	List<Product> findByRatingLessThanEqual(float rating);
	
	//Search product having (this.rating >= rating)
	List<Product> findByRatingGreaterThanEqual(float rating);
	
	//Search product having (rating_1 <= this.rating <= rating_2)
	List<Product> findByRatingBetween(float rating1, float rating2);
	
	//Sort products by price ascending
	List<Product> findByOrderByPrice();
	
	//Sort products by price descending
	List<Product> findByOrderByPriceDesc();
	
	//Sort products by rating ascending
	List<Product> findByOrderByRating();
	
	//Sort products by rating descending
	List<Product> findByOrderByRatingDesc();
}
