package com.SpringPro.Product_Management;

import com.SpringPro.Product_Management.Repository.ProductRepository;
import com.SpringPro.Product_Management.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;
    @PostMapping
    public Product createProduct(@RequestBody Product product){
        productRepository.save(product);
        return product;
    }
    @GetMapping
    public List<Product> getAllProduct(){
        return productRepository.findAll();
    }
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id,@RequestBody Product product){
        product.setId(id);
        return productRepository.save(product);
    }
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id){
        productRepository.deleteById(id);
    }
}
