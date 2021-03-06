package com.hcl.groupfour.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.sql.rowset.serial.SerialBlob;
import javax.sql.rowset.serial.SerialException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.hcl.groupfour.model.Category;
import com.hcl.groupfour.model.Product;
import com.hcl.groupfour.model.ProductFilterObject;
import com.hcl.groupfour.repository.CategoryRepository;
import com.hcl.groupfour.repository.ProductRepository;

@Service
public class ProductService {

	@Autowired
	private ProductRepository pr;
	
	@Autowired CategoryRepository cr;
	
	public List<Product> listAll(){
		return pr.findAll();
	}
	
//	public Optional<Product> findById(Long id) {
//		return pr.findById(id);
//	}
	
	public List<Product> listFiltered(ProductFilterObject filter, String sort){
		List<Product> filtered = pr.getFilteredProducts(filter, sort);
		if(filter.isUsingCategories()) {
			Set<String> chosen = new HashSet<>(Arrays.asList(filter.getCategories()));
			filtered = filtered.stream().filter( (product) -> {
				Set<String> intersection = product.getCategories().stream().map( cat -> cat.getName()).collect(Collectors.toSet());
				intersection.retainAll(chosen);
				return intersection.size()>0;
			}).collect(Collectors.toList());
		}
		return filtered;
	}
	
	public byte[] getImage(long id) throws SQLException, IOException {
		Product prd = pr.findById(id).get();
		Blob image = prd.getImage();
		return image.getBytes(1, (int) image.length());

	}
	
	public Product saveProduct(Product prd)  {
		return pr.save(prd);
	}


	public void saveImage(Long id, MultipartFile file) throws IOException, SerialException, SQLException {
		Product prd = pr.findById(id).get();
		if(!(file==null) && !file.isEmpty()) {
			Blob blob = new SerialBlob(file.getBytes());
			prd.setImage(blob);
			pr.save(prd);
		} else {
			File imageFile = new ClassPathResource("static/default.png").getFile();
			byte[] fileContent = Files.readAllBytes(imageFile.toPath());
			Blob blob = new SerialBlob(fileContent);
			prd.setImage(blob);
		}
		pr.save(prd);
	}
	
	public Product editProduct(Long id, Product prd) {
		Optional<Product> productData = pr.findById(id);
		if(productData.isPresent()) {
			Product p = productData.get();
			p.setName(prd.getName());
			p.setBrand(prd.getBrand());
			p.setInventory(prd.getInventory());
			p.setPrice(prd.getPrice());
			p.setDescription(prd.getDescription());
			p.setCategories(prd.getCategories());
			return pr.save(p);
		}
		return null;
	}
	
	public List<String> getAllProductCategoryNames() {
		return cr.findAll().stream().map(cat -> cat.getName()).collect(Collectors.toList());
	}
	
	public List<Category> getCategoriesByName(String[] names) {
		return cr.findByNameIn(Arrays.asList(names));
	}
	
	public Product getById(Long id) {
		return pr.findById(id).orElse(null);
	}
	
	public void deleteById(Long id) {
		pr.deleteById(id);
	}
	

}
