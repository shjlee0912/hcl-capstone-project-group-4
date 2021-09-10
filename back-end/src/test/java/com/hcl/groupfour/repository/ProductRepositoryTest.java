package com.hcl.groupfour.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import com.hcl.groupfour.model.Product;
import com.hcl.groupfour.model.ProductFilterObject;

@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@SpringBootTest
@AutoConfigureMockMvc
public class ProductRepositoryTest {

	@Autowired
	ProductRepository repositoryUnderTest;
	
	Product prd1;
	long id1;
	Product prd2;
	long id2;
	
    @BeforeEach
    public void contextLoads() {        
        MockitoAnnotations.openMocks(this);
        prd1 = new Product();
        prd1.setName("Chair");
        prd1.setBrand("Brand1");
        prd1.setInventory(5);
        prd1.setPrice(10);
        repositoryUnderTest.save(prd1);
        id1 = prd1.getId();
        prd2 = new Product();
        prd2.setName("Couch");
        prd2.setBrand("Brand2");
        prd2.setInventory(10);
        prd2.setPrice(12);
        repositoryUnderTest.save(prd2);
        id2 = prd2.getId();
    }
	
	@Test
	public void filtersByMinPrice() {
		ProductFilterObject filter = new ProductFilterObject();
		filter.setUsingMinPrice(true);
		filter.setMinPrice(11);
		repositoryUnderTest.save(prd1);
		repositoryUnderTest.save(prd2);
		List<Product> filtered = repositoryUnderTest.getFilteredProducts(filter, "AZ");
		assertEquals(filtered.size(), 1);
		assertEquals(filtered.get(0).getId(), id2);
	}
	
	@Test
	public void filtersByMaxPrice() {
		ProductFilterObject filter = new ProductFilterObject();
		filter.setUsingMaxPrice(true);
		filter.setMaxPrice(11);
		repositoryUnderTest.save(prd1);
		repositoryUnderTest.save(prd2);
		List<Product> filtered = repositoryUnderTest.getFilteredProducts(filter, "AZ");
		assertEquals(filtered.size(), 1);
		assertEquals(filtered.get(0).getId(), id1);
	}
	
	@Test
	public void filtersByName() {
		ProductFilterObject filter = new ProductFilterObject();
		filter.setUsingName(true);
		filter.setNameIncludes("Ch");
		repositoryUnderTest.save(prd1);
		repositoryUnderTest.save(prd2);
		List<Product> filtered = repositoryUnderTest.getFilteredProducts(filter, "AZ");
		assertEquals(filtered.size(), 1);
		assertEquals(filtered.get(0).getId(), id1);
	}
	
	@Test
	public void sortsByPriceAscending() {
		ProductFilterObject filter = new ProductFilterObject();
		repositoryUnderTest.save(prd1);
		repositoryUnderTest.save(prd2);
		List<Product> filtered = repositoryUnderTest.getFilteredProducts(filter, "PRICE_ASC");
		assertEquals(filtered.size(), 2);
		assertEquals(filtered.get(0).getId(), id1);
		assertEquals(filtered.get(1).getId(), id2);
	}
	
	@Test
	public void sortsByPriceDescending() {
		ProductFilterObject filter = new ProductFilterObject();
		repositoryUnderTest.save(prd1);
		repositoryUnderTest.save(prd2);
		List<Product> filtered = repositoryUnderTest.getFilteredProducts(filter, "PRICE_DESC");
		assertEquals(filtered.size(), 2);
		assertEquals(filtered.get(0).getId(), id2);
		assertEquals(filtered.get(1).getId(), id1);
	}
	
	@Test
	public void sortsByNameAscending() {
		ProductFilterObject filter = new ProductFilterObject();
		repositoryUnderTest.save(prd1);
		repositoryUnderTest.save(prd2);
		List<Product> filtered = repositoryUnderTest.getFilteredProducts(filter, "AZ");
		assertEquals(filtered.size(), 2);
		assertEquals(filtered.get(0).getId(), id1);
		assertEquals(filtered.get(1).getId(), id2);
	}
	
	@Test
	public void sortsByNameDescending() {
		ProductFilterObject filter = new ProductFilterObject();
		repositoryUnderTest.save(prd1);
		repositoryUnderTest.save(prd2);
		List<Product> filtered = repositoryUnderTest.getFilteredProducts(filter, "ZA");
		assertEquals(filtered.size(), 2);
		assertEquals(filtered.get(0).getId(), id2);
		assertEquals(filtered.get(1).getId(), id1);
	}
	
}
