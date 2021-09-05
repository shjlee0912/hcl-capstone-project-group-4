package com.hcl.groupfour.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
@Entity
public class Address {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	/* The way this class is currently set up, each address is associated with one user, who may have many addresses.
	The name in the address entity need not be the same as the user's name, in case the user ships something
	to another person, or if a billing address has a different name associated with it*/
	@ManyToOne
	@JsonIgnore
	private User user;
	
	@Column(nullable = false)
	private String firstName;
	
	@Column(nullable = false)
	private String lastName;
		
	@Column(nullable = false)
	private String streetAddr; //address line 1
	
	@Column(nullable = false)
	private String city;
	
	@Column(nullable = false)
	private String state;
	
	@Column(nullable = false)
	private int zipCode;
	
}
