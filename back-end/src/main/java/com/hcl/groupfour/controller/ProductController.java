package com.hcl.groupfour.controller;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.sql.rowset.serial.SerialException;

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
import org.springframework.web.multipart.MultipartFile;

import com.hcl.groupfour.model.Product;
import com.hcl.groupfour.repository.ProductFilterObject;
import com.hcl.groupfour.service.ProductService;

@RestController
public class ProductController {
	
	@Autowired
	private ProductService ps;
	
	@GetMapping("/products")
	public ResponseEntity<List<Product>> getAllProducts(){
		try {
			List<Product> products = new ArrayList<Product>();
			return new ResponseEntity<>(ps.listAll(),HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping("/products_sorted")
	public ResponseEntity<List<Product>> getFilteredProducts(@RequestBody ProductFilterObject obj, @RequestParam(required=false) String sort){
		System.out.println(obj);
		System.out.println(sort);
		try {
			List<Product> products = new ArrayList<Product>();
			if(obj != null) {
				ps.listFiltered(obj, sort).forEach(products::add);
			} else {
				ps.listAll().forEach(products::add);
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
	
//	@PostMapping("/products")
//	public ResponseEntity<Product> createProduct(@RequestBody Product product, @RequestParam("image") MultipartFile multipartFile){
//		try {
//			Product prd = ps.saveProduct(product, multipartFile);
//			return new ResponseEntity<>(prd, HttpStatus.CREATED);
//		} catch (Exception e) {
//			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//		}
//	}
	
	@PostMapping("/products_image/{id}")
	public ResponseEntity<HttpStatus> saveImage(@PathVariable("id") Long id, @RequestParam("image") MultipartFile multipartFile) throws IOException{
		try {
			ps.saveImage(id, multipartFile);
			return new ResponseEntity<>(HttpStatus.ACCEPTED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping("/products/{id}")
	public ResponseEntity<Product> updateProduct(@PathVariable("id") Long id, @RequestBody Product product) throws SerialException, IOException, SQLException{
		Product prd = ps.editProduct(id, product, null);
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
