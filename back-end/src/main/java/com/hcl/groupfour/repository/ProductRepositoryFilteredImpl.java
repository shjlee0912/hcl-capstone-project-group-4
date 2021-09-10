package com.hcl.groupfour.repository;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;

import com.hcl.groupfour.model.Product;
import com.hcl.groupfour.model.ProductFilterObject;

public class ProductRepositoryFilteredImpl implements ProductRepositoryFiltered {

	@Autowired
	EntityManager entityManager;
	
	@Override
	public List<Product> getFilteredProducts(ProductFilterObject filter, String sort) {
		CriteriaBuilder cb = entityManager.getCriteriaBuilder();
		CriteriaQuery<Product> cr = cb.createQuery(Product.class);
		Root<Product> product = cr.from(Product.class);
		
		List<Predicate> predicates = new ArrayList<>();
		if(filter != null) {
			if(filter.isUsingMinPrice()) {
				predicates.add(cb.ge(product.get("price"), filter.getMinPrice()));
			}
			if(filter.isUsingMaxPrice()) {
				predicates.add(cb.le(product.get("price"), filter.getMaxPrice()));
			}
			if(filter.isUsingName()) {
				predicates.add(cb.like(product.get("name"), "%" + filter.getNameIncludes() + "%"));
			}
		}
		cr.where(predicates.toArray(new Predicate[predicates.size()]));
		if("AZ".equals(sort)) {
			cr.orderBy(cb.asc(product.get("name")));
		} else if ("ZA".equals(sort)) {
			cr.orderBy(cb.desc(product.get("name")));
		} else if ("PRICE_ASC".equals(sort)) {
			cr.orderBy(cb.asc(product.get("price")));
		} else if ("PRICE_DESC".equals(sort)) {
			cr.orderBy(cb.desc(product.get("price")));
		}
		return entityManager.createQuery(cr).getResultList();
	}

}
