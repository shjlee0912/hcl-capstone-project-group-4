package com.hcl.groupfour.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hcl.groupfour.model.MyUserDetails;
import com.hcl.groupfour.model.User;
import com.hcl.groupfour.repository.UserRepository;


@Service
public class JwtUserDetailsService implements UserDetailsService {
	
	@Autowired
	UserRepository ur;
	  
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = ur.findByUsername(username);
		if (user!=null) {
			return new MyUserDetails(user);
		}else {
			throw new UsernameNotFoundException("User not found with username: " + username);
			
			
		}
		
	}
	
}