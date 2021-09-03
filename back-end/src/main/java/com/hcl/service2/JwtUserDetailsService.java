package com.hcl.service2;

import java.util.ArrayList;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class JwtUserDetailsService implements UserDetailsService {
	
	
	  
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	
		if ("jack".equals(username)) {
			return new User("jack","$2a$12$Ey2xIyr3fmNa/1sYwiLTGeExmF7R3VMAYf51rCd398eK/z.7mfRJi",new ArrayList<>());
			
		}else {
			throw new UsernameNotFoundException("User not found with username: " + username);
			
			
		}
		
	}
	
}