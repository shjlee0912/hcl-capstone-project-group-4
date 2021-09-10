package com.hcl.groupfour.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.hcl.groupfour.config.JwtTokenUtil;
import com.hcl.groupfour.model.JwtRequest;
import com.hcl.groupfour.model.MyUserDetails;
import com.hcl.groupfour.model.User;
import com.hcl.groupfour.service.JwtUserDetailsService;
import com.hcl.groupfour.service.UserService;

@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@SpringBootTest
@AutoConfigureMockMvc
public class JwtAuthenticationControllerTest {
	
	ObjectMapper mapper;
    
	@MockBean
	private AuthenticationManager authenticationManager;

	@MockBean
	private JwtTokenUtil jwtTokenUtil;

	@MockBean
	private JwtUserDetailsService userDetailsService;
	
	@MockBean
	private UserService userService;

    @InjectMocks
    JwtAuthenticationController controllerUnderTest;

	private MockMvc mockMvc;

    @BeforeEach
    public void contextLoads() {
        mapper = new ObjectMapper();
        
        MockitoAnnotations.openMocks(this);

        this.mockMvc = MockMvcBuilders.standaloneSetup(controllerUnderTest).build();
    }

    @Test
    public void testAuthenticate() throws Exception {
    	User fakeUser = new User();
    	fakeUser.setUsername("username");
    	fakeUser.setPassword("$2a$12$GQUkm.PohmEQnu4RneGM/OhDSeRAWvURfsMiPedePQg.i8dWmhMxC"); //"123" encrypted with BCrypt
    	MyUserDetails userDetails = new MyUserDetails(fakeUser);
    	JwtRequest loginRequest = new JwtRequest("username", "123");
    	when(authenticationManager.authenticate(new UsernamePasswordAuthenticationToken("username", "123"))).thenReturn(null); //just needs to not throw exception
    	when(userDetailsService.loadUserByUsername("username")).thenReturn(userDetails);
    	when(jwtTokenUtil.generateToken(userDetails)).thenReturn("valid token"); //do not actually generate the token
    	mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
    	ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
    	String requestBody = ow.writeValueAsString(loginRequest);
        mockMvc.perform(post("/authenticate")
        		.content(requestBody)
        		.characterEncoding("utf-8")
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().is(200))
                .andExpect(jsonPath("token").value("valid token"));
    }
}
