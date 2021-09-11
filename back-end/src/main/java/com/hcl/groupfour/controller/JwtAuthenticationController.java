package com.hcl.groupfour.controller;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.hcl.groupfour.config.JwtTokenUtil;
import com.hcl.groupfour.dto.ClientUserDTO;
import com.hcl.groupfour.dto.UserDTO;
import com.hcl.groupfour.exception.UserNameUnavailableException;
import com.hcl.groupfour.model.Address;
import com.hcl.groupfour.model.JwtRequest;
import com.hcl.groupfour.model.JwtResponse;
import com.hcl.groupfour.model.User;
import com.hcl.groupfour.service.JwtUserDetailsService;
import com.hcl.groupfour.service.UserService;


@RestController
public class JwtAuthenticationController {
	
	private final static Logger log = LogManager.getLogger(JwtAuthenticationController.class);

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private JwtUserDetailsService userDetailsService;
	
	@Autowired
	private UserService userService;

	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)	 
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
		authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
		final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
		final String token = jwtTokenUtil.generateToken(userDetails);
		return ResponseEntity.ok(new JwtResponse(token));//httpstatus as 200(ok) and also show token
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody UserDTO newUser) {
		try {
			User registeredUser = userService.registerUser(newUser);
			final UserDetails userDetails = userDetailsService.loadUserByUsername(registeredUser.getUsername());
			final String token = jwtTokenUtil.generateToken(userDetails);
			return ResponseEntity.ok(new JwtResponse(token));
		} catch(UserNameUnavailableException ex) {
			log.error("ERROR: Username unavailable. Message: " + ex.getMessage());
			return ResponseEntity.status(409).build();
		}
	}
	
	@GetMapping("/user")
	public ResponseEntity<ClientUserDTO> getUserInfo(Principal p) {
		ClientUserDTO user = new ClientUserDTO();
		User authUser = userService.getUser(p.getName());
		user.setAddresses(authUser.getAddresses().toArray(new Address[1]));
		user.setFirstName(authUser.getFirstName());
		user.setLastName(authUser.getLastName());
		user.setUsername(authUser.getUsername());
		user.setEmail(authUser.getEmail());
		user.setPhoneNumber(authUser.getPhoneNumber());
		List<String> roles = authUser.getRoles().stream().map(r -> r.getType()).collect(Collectors.toList());
		user.setRoles(roles.toArray(new String[0]));
		return ResponseEntity.ok(user);
	}
	
	 

	private void authenticate(String username, String password) throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
			log.info("INFO: User Authenticated");
		} catch (DisabledException e) {
			log.error("ERROR: User disabled. Message: " + e.getMessage());
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			log.error("ERROR: Bad credentials. Message: " + e.getMessage());
			throw new Exception("INVALID_CREDENTIALS", e);
		}
	}
}
