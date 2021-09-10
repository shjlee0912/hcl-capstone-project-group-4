package com.hcl.groupfour.service;

import java.util.Arrays;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hcl.groupfour.dto.UserDTO;
import com.hcl.groupfour.exception.UserNameUnavailableException;
import com.hcl.groupfour.model.Address;
import com.hcl.groupfour.model.Role;
import com.hcl.groupfour.model.User;
import com.hcl.groupfour.repository.AddressRepository;
import com.hcl.groupfour.repository.RoleRepository;
import com.hcl.groupfour.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	UserRepository ur;
	
	@Autowired
	RoleRepository rr;
	
	@Autowired
	AddressRepository ar;
	
	@Autowired
	PasswordEncoder encoder;
	
	public User getUser(String username) {
		return ur.findByUsername(username);
	}
	
	@Transactional(rollbackOn = UserNameUnavailableException.class)
	public User registerUser(UserDTO userDTO) throws UserNameUnavailableException {
		if(ur.findByUsername(userDTO.getUsername())!=null) {
			throw new UserNameUnavailableException();
		}
		System.out.println(userDTO);
		User newUser = new User();
		newUser.setUsername(userDTO.getUsername());
		newUser.setFirstName(userDTO.getFirstName());
		newUser.setLastName(userDTO.getLastName());
		newUser.setEmail(userDTO.getEmail());
		newUser.setPhoneNumber(userDTO.getPhoneNumber());
		newUser.setPassword(encoder.encode(userDTO.getPassword()));
		Role userRole = rr.getByType("ROLE_USER");
		newUser.setRoles(Arrays.asList(userRole));
		newUser = ur.save(newUser);

		Address userAddr = userDTO.getAddresses()[0];
		Address newAddress = new Address();
		newAddress.setFirstName(userDTO.getFirstName());
		newAddress.setLastName(userDTO.getLastName());
		newAddress.setStreetAddr(userAddr.getStreetAddr());
		newAddress.setCity(userAddr.getCity());
		newAddress.setState(userAddr.getState());
		newAddress.setZipCode(newAddress.getZipCode());
		newAddress.setUser(newUser);
		ar.save(newAddress);
		
		return newUser;
	}
	
}
