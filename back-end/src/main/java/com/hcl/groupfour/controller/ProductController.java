package com.hcl.groupfour.controller;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.sql.rowset.serial.SerialException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
import com.hcl.groupfour.model.ProductFilterObject;
import com.hcl.groupfour.service.ProductService;

@RestController
public class ProductController {
	
	private final static Logger log = LogManager.getLogger(ProductController.class);
	
	@Autowired
	private ProductService ps;
	
	@GetMapping("/products")
	public ResponseEntity<List<Product>> getAllProducts(){
		try {
			List<Product> products = new ArrayList<Product>();
			log.info("INFO: Products successfully listed.");
			return new ResponseEntity<>(ps.listAll(),HttpStatus.OK);
		} catch (Exception e) {
			log.error("ERROR: Products failed to list. Message: " + e.getMessage());
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	@PostMapping("/products_sorted")
	public ResponseEntity<List<Product>> getFilteredProducts(@RequestBody ProductFilterObject obj, @RequestParam(required=false) String sort){
		logger.info("getting filtered products");
		try {
			List<Product> products = new ArrayList<Product>();
			if(obj != null) {
				ps.listFiltered(obj, sort).forEach(products::add);
			} else {
				ps.listAll().forEach(products::add);
			}
			log.info("INFO: Products successfully sorted.");
			return new ResponseEntity<>(products,HttpStatus.OK);
		} catch (Exception e) {
			log.error("ERROR: Products failed to sort. Message: " + e.getMessage());
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping(value = "/image/{id}", produces=MediaType.IMAGE_JPEG_VALUE)
	public byte[] getImage(@PathVariable long id) throws SQLException, IOException {
		return ps.getImage(id);
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
			log.info("INFO: Product(s) successfully saved.");
			return new ResponseEntity<>(prd, HttpStatus.CREATED);
		} catch (Exception e) {
			log.error("ERROR: Product(s) failed to save. Message: " + e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	@PostMapping("/products_image/{id}")
	public ResponseEntity<HttpStatus> saveImage(@PathVariable("id") Long id, @RequestParam(value="image", required = false) MultipartFile multipartFile) throws IOException{
		try {
			ps.saveImage(id, multipartFile);
			log.info("INFO: Image successfully saved.");
			return new ResponseEntity<>(HttpStatus.ACCEPTED);
		} catch (Exception e) {
			log.error("ERROR: Image failed to save. Message: " + e.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping("/products/{id}")
	public ResponseEntity<Product> updateProduct(@PathVariable("id") Long id, @RequestBody Product product) throws SerialException, IOException, SQLException{
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
			log.info("INFO: Image successfully deleted.");
			return new ResponseEntity<>(HttpStatus.ACCEPTED);
		} catch (Exception e) {
			log.error("ERROR: Image failed to delete, Message: " + e.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
