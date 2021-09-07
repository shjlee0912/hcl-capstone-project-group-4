package com.hcl.groupfour.repository;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProductSortObject {
	private boolean priceDesc = false;
	private boolean priceAsc = false;
	
	private boolean nameDesc = false;
	private boolean nameAsc = false;
}
