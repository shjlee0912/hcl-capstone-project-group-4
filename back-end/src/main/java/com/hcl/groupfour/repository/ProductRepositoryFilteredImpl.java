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

public class ProductRepositoryFilteredImpl implements ProductRepositoryFiltered {

	@Autowired
	EntityManager entityManager;
	
	@Override
	public List<Product> getFilteredProducts(ProductFilterObject filter, ProductSortObject sort) {
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
				predicates.add(cb.like(product.get("name"), "%" + filter.getNameIncludes() + "&"));
			}
			if(filter.isUsingCategory()) {
				predicates.add(cb.equal(product.get("category"), filter.getCategory()));
			}
		}
		cr.where(predicates.toArray(new Predicate[predicates.size()]));
		if(sort.isPriceAsc()) {
			cr.orderBy(cb.asc(product.get("price")));
		} else if (sort.isPriceDesc()) {
			cr.orderBy(cb.desc(product.get("price")));
		} else if (sort.isNameAsc()) {
			cr.orderBy(cb.asc(product.get("name")));
		} else if (sort.isNameDesc()) {
			cr.orderBy(cb.desc(product.get("name")));
		}
		return entityManager.createQuery(cr).getResultList();
	}

}
