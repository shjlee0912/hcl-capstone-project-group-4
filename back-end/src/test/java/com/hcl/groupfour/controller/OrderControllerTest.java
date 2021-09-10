package com.hcl.groupfour.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.security.Principal;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.hcl.groupfour.dto.AddressDTO;
import com.hcl.groupfour.dto.PlaceOrderDTO;
import com.hcl.groupfour.exception.InsufficientInventoryException;
import com.hcl.groupfour.model.Address;
import com.hcl.groupfour.service.OrderService;
import com.stripe.model.Charge;

@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@SpringBootTest
@AutoConfigureMockMvc
public class OrderControllerTest {
	
	ObjectMapper mapper;
    	
	@MockBean
	private OrderService orderService;

    @InjectMocks
    OrderController controllerUnderTest;

	private MockMvc mockMvc;

    @BeforeEach
    public void contextLoads() {
        mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        MockitoAnnotations.openMocks(this);

        this.mockMvc = MockMvcBuilders.standaloneSetup(controllerUnderTest).build();
    }
    
    @Test
    public void testPlaceOrderSuccess() throws Exception {
    	Charge mockedCharge = Mockito.mock(Charge.class);
    	PlaceOrderDTO dto = new PlaceOrderDTO();
    	Principal mockPrincipal = Mockito.mock(Principal.class);
    	when(mockPrincipal.getName()).thenReturn("username");
    	ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
    	String body = ow.writeValueAsString(dto);
    	when(orderService.makePayment(dto, "username")).thenReturn(mockedCharge);
    	 mockMvc.perform(post("/order")
    			 .principal(mockPrincipal)
         		 .content(body)
         		 .characterEncoding("utf-8")
                 .contentType(MediaType.APPLICATION_JSON))
                 .andDo(print())
                 .andExpect(status().is(200));
    }
    
    @Test
    public void testPlaceOrderFailure() throws Exception {
    	Charge mockedCharge = Mockito.mock(Charge.class);
    	PlaceOrderDTO dto = new PlaceOrderDTO();
    	Principal mockPrincipal = Mockito.mock(Principal.class);
    	when(mockPrincipal.getName()).thenReturn("username");
    	ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
    	String body = ow.writeValueAsString(dto);
    	when(orderService.makePayment(dto, "username")).thenThrow(new InsufficientInventoryException("error in order service"));
    	 mockMvc.perform(post("/order")
    			 .principal(mockPrincipal)
         		 .content(body)
         		 .characterEncoding("utf-8")
                 .contentType(MediaType.APPLICATION_JSON))
                 .andDo(print())
                 .andExpect(status().is(500));
    }
    
    @Test
    public void testCreateShippingAddress() throws Exception {
    	AddressDTO dto = new AddressDTO();
    	dto.setCity("city");
    	ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
    	String body = ow.writeValueAsString(dto);
    	Address created = new Address();
    	created.setCity("city");
    	when(orderService.createAddress(dto, "username")).thenReturn(created);
    	
    	Principal mockPrincipal = Mockito.mock(Principal.class);
    	when(mockPrincipal.getName()).thenReturn("username");
    	 mockMvc.perform(post("/shipping_address")
    			 .principal(mockPrincipal)
    			 .content(body)
         		 .characterEncoding("utf-8")
                 .contentType(MediaType.APPLICATION_JSON))
                 .andDo(print())
                 .andExpect(status().is(200))
    	 		.andExpect(jsonPath("$.city").value("city"));
    }

}