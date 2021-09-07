package com.hcl.groupfour.repository;

import java.util.List;

import com.hcl.groupfour.model.Product;

public interface ProductRepositoryFiltered {
	
	public List<Product> getFilteredProducts(ProductFilterObject filter, String sort);
}
