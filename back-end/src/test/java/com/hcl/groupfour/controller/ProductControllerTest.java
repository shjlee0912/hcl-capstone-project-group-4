package com.hcl.groupfour.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.hcl.groupfour.model.Product;
import com.hcl.groupfour.model.ProductFilterObject;
import com.hcl.groupfour.service.ProductService;

@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@SpringBootTest
@AutoConfigureMockMvc
public class ProductControllerTest {

	ObjectMapper mapper;
	
	@MockBean
	ProductService ps;
	
	@InjectMocks
	ProductController controllerUnderTest;
	
	private MockMvc mockMvc;
	
	List<Product> allProducts;
	
	Product pr1;
	Product pr2;
	
	@BeforeEach
    public void contextLoads() {
        mapper = new ObjectMapper();
    	mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        
        MockitoAnnotations.openMocks(this);
        pr1 = new Product();
        pr2 = new Product();
        pr1.setId(1l);
        pr1.setName("Product1");
        pr2.setId(2l);
        pr2.setName("Product2");
        allProducts = Arrays.asList(pr1, pr2);
        this.mockMvc = MockMvcBuilders.standaloneSetup(controllerUnderTest).build();
    }
	
	@Test
	public void testGetAllProducts() throws Exception {
		when(ps.listAll()).thenReturn(allProducts);
        mockMvc.perform(get("/products")
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].id").value("1"))
                .andExpect(jsonPath("$[0].name").value("Product1"))
                .andExpect(jsonPath("$[1].id").value("2"))
        		.andExpect(jsonPath("$[1].name").value("Product2"));
	}
	
	@Test
	public void testGetFilteredProducts() throws Exception {
		ProductFilterObject filter = new ProductFilterObject();
		filter.setUsingName(true);
		filter.setNameIncludes("duct1");
		when(ps.listFiltered(filter, "AZ")).thenReturn(Arrays.asList(pr2));
		ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
    	String requestBody = ow.writeValueAsString(filter);

        mockMvc.perform(post("/products_sorted?sort=AZ")
        		.content(requestBody)
        		.characterEncoding("utf-8")
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].id").value("2"))
                .andExpect(jsonPath("$[0].name").value("Product2"));
	}
	
	
}
