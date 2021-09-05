package com.hcl.groupfour.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hcl.groupfour.model.Product;
import com.hcl.groupfour.repository.ProductRepository;

@Service
public class ProductService {

	@Autowired
	private ProductRepository pr;
	
	public List<Product> listAll(){
		return pr.findAll();
	}
	
	public List<Product> getAllProductsContainingName(String name){
		return pr.findByNameContaining(name);
	}
	
	public Product saveProduct(Product prd) {
		return pr.save(prd);
	}
	
	public Product editProduct(Long id, Product prd) {
		Optional<Product> productData = pr.findById(id);
		if(productData.isPresent()) {
			Product p = productData.get();
			p.setName(prd.getName());
			p.setBrand(prd.getBrand());
			p.setInventory(prd.getInventory());
			p.setPrice(prd.getPrice());
			p.setImage(prd.getImage());
			p.setDescription(prd.getDescription());
			return pr.save(p);
		}
		return null;
	}
	
	public Product getById(Long id) {
		return pr.findById(id).orElse(null);
	}
	
	public void deleteById(Long id) {
		pr.deleteById(id);
	}
	
	public List<Product> sortProductByPrice(boolean ascending){
		if(ascending) {
			return pr.findByOrderByPrice();
		} else {
			return pr.findByOrderByPriceDesc();
		}
	}
	

	
	public List<Product> filterProductByPriceBetween(float price1, float price2){
		return pr.findByPriceBetween(price1, price2);
	}

}
