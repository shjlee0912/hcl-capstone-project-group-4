package com.hcl.groupfour.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hcl.groupfour.model.Product;
import com.hcl.groupfour.service.ProductService;

@RestController
public class ProductController {
	
	@Autowired
	private ProductService ps;
	
	@GetMapping("/products")
	public ResponseEntity<List<Product>> getAllProducts(@RequestParam(required = false) String name){
		try {
			List<Product> products = new ArrayList<Product>();
			if(name == null) {
				ps.listAll().forEach(products::add);
			} else {
				ps.getAllProductsContainingName(name).forEach(products::add);
			}
			
			return new ResponseEntity<>(products,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/categories")
	public ResponseEntity<List<String>> getAllCategoryNames() {
		return ResponseEntity.ok(ps.getAllProductCategoryNames());
	}
	
	@GetMapping("/products/sort-price")
	public ResponseEntity<List<Product>> getAllProductsSortedByPrice(@RequestParam(defaultValue="true") boolean ascending){
		try {
			List<Product> products = ps.sortProductByPrice(ascending);
			if(products.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			
			return new ResponseEntity<>(products,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	@GetMapping("/products/filter-price")
	public ResponseEntity<List<Product>> getProductsFilteredByPrice(@RequestParam(defaultValue="0") float low, @RequestParam float high){
		try {
			List<Product> products = ps.filterProductByPriceBetween(low, high);
			if(products.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(products,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	@GetMapping("/products/{id}")
	public ResponseEntity<Product> getProductById(@PathVariable("id") Long id){
		Product prd = ps.getById(id);
		if(prd == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(prd,HttpStatus.OK);
	}
	
	
	@PostMapping("/products")
	public ResponseEntity<Product> createProduct(@RequestBody Product product){
		try {
			Product prd = ps.saveProduct(product);
			return new ResponseEntity<>(prd, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping("/products/{id}")
	public ResponseEntity<Product> updateProduct(@PathVariable("id") Long id, @RequestBody Product product){
		Product prd = ps.editProduct(id, product);
		if(prd == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(prd, HttpStatus.OK);
	}
	
	@DeleteMapping("/products/{id}")
	public ResponseEntity<HttpStatus> deleteProduct(@PathVariable("id") Long id){
		try {
			ps.deleteById(id);
			return new ResponseEntity<>(HttpStatus.ACCEPTED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
