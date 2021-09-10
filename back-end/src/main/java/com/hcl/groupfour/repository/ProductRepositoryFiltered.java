package com.hcl.groupfour.repository;

import java.util.List;

import com.hcl.groupfour.model.Product;
import com.hcl.groupfour.model.ProductFilterObject;

public interface ProductRepositoryFiltered {
	
	public List<Product> getFilteredProducts(ProductFilterObject filter, String sort);
}
