package com.hcl.groupfour.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hcl.groupfour.model.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long>{

	Role getByType(String type);
	
}
