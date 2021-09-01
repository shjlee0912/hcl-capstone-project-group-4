package com.hcl.groupfour.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import lombok.Data;

@Data
@Entity
public class User {

	@Id
	private long id;
	
	@Column(unique = true)
	private String username;
	
	private String password;
	
	private String firstName;
	
	private String lastName;
	
	private String phone_number;
	
	private String email;
	
	@OneToMany(mappedBy="user")
	private List<Address> addresses;
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(
			name="user_role",
			joinColumns = @JoinColumn(name="user_id"),
			inverseJoinColumns = @JoinColumn(name="role_id"))
	private List<Role> roles;
	
}
