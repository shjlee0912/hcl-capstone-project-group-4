package com.hcl.groupfour.service;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.imageio.ImageIO;
import javax.sql.rowset.serial.SerialBlob;
import javax.sql.rowset.serial.SerialException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.hcl.groupfour.model.Product;
import com.hcl.groupfour.repository.CategoryRepository;
import com.hcl.groupfour.repository.ProductFilterObject;
import com.hcl.groupfour.repository.ProductRepository;
import com.hcl.groupfour.repository.ProductSortObject;

@Service
public class ProductService {

	@Autowired
	private ProductRepository pr;
	
	@Autowired CategoryRepository cr;
	
	public List<Product> listAll(){
		return pr.findAll();
	}
	
	public List<Product> listFiltered(ProductFilterObject filter, ProductSortObject sort){
		return pr.getFilteredProducts(filter, sort);
	}
	
	public List<Product> getAllProductsContainingName(String name){
		return pr.findByNameContaining(name);
	}
	
	public Product saveProduct(Product prd, MultipartFile file) throws IOException, SerialException, SQLException {
		if(!file.isEmpty()) {
			Blob blob = new SerialBlob(file.getBytes());
			prd.setImage(blob);
		} else {
			File imageFile = new File("default.png");
			byte[] fileContent = Files.readAllBytes(imageFile.toPath());
			Blob blob = new SerialBlob(fileContent);
			prd.setImage(blob);
		}
		return pr.save(prd);
	}
	
	public Product editProduct(Long id, Product prd, MultipartFile file) throws IOException, SerialException, SQLException {
		Optional<Product> productData = pr.findById(id);
		if(productData.isPresent()) {
			Product p = productData.get();
			p.setName(prd.getName());
			p.setBrand(prd.getBrand());
			p.setInventory(prd.getInventory());
			p.setPrice(prd.getPrice());
			if(!file.isEmpty()) {
				Blob blob = new SerialBlob(file.getBytes());
				p.setImage(blob);
			}
			p.setDescription(prd.getDescription());
			return pr.save(p);
		}
		return null;
	}
	
	public List<String> getAllProductCategoryNames() {
		return cr.findAll().stream().map(cat -> cat.getName()).collect(Collectors.toList());
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
