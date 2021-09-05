package com.hcl.groupfour.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hcl.groupfour.model.Address;

public interface AddressRepository extends JpaRepository<Address, Long>{

}
