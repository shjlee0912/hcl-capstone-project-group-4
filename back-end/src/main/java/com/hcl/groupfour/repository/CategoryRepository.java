package com.hcl.groupfour.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hcl.groupfour.model.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>{
		
	List<Category> findByNameIn(List<String> names);
	
}
