package com.hcl.groupfour.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.annotation.DirtiesContext;

import com.hcl.groupfour.model.Category;
import com.hcl.groupfour.model.Product;
import com.hcl.groupfour.model.ProductFilterObject;
import com.hcl.groupfour.repository.CategoryRepository;
import com.hcl.groupfour.repository.ProductRepository;

@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@SpringBootTest
@AutoConfigureMockMvc
public class ProductServiceTest {
	
	@MockBean
	ProductRepository pr;
	
	@MockBean
	CategoryRepository cr;
	
	@InjectMocks
	ProductService serviceUnderTest;
	
	private List<Product> allProducts;
	Product pr1;
	Product pr2;
	Product pr3;
		
	@BeforeEach
    public void contextLoads() {
		Category cat1 = new Category();
		cat1.setName("cat1");
		pr1 = new Product();
		pr1.setId(1l);
		pr1.setCategories(new ArrayList<Category>());
		pr2 = new Product();
		pr2.setId(2l);
		pr2.setCategories(Arrays.asList(cat1));
		pr3 = new Product();
		pr3.setId(3l);
		pr3.setCategories(new ArrayList<Category>());
		allProducts = Arrays.asList(pr1, pr2, pr3);
        MockitoAnnotations.openMocks(this);
    }
	
	@Test
	public void testListFiltered() {
		ProductFilterObject filter = new ProductFilterObject();
		filter.setCategories(new String[]{"cat1"});
		filter.setUsingCategories(true);
		when(pr.getFilteredProducts(filter, "ZA")).thenReturn(allProducts);
		List<Product> sorted = serviceUnderTest.listFiltered(filter, "ZA");
		System.out.println(sorted);
		Assertions.assertEquals(sorted.size(), 1);
		assertEquals(sorted.get(0), pr2);
	}
	
}
