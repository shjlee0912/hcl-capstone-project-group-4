package com.hcl.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JWTController {

	@GetMapping("/jwt")
	public String businessLogic() {
		return "Hey there.";
	}

}