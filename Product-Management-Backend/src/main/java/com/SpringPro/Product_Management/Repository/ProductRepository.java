package com.SpringPro.Product_Management.Repository;

import com.SpringPro.Product_Management.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
