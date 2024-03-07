import { Controller, Get, Param } from '@nestjs/common';
import axios from 'axios';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService) { }
    /**
     * 
     * @returns {Promise<any>}
     */
    @Get('/')
    async getProducts(): Promise<any> {
        return this.productService.getProducts();
    }
    
    /**
     * 
     * @param id 
     * @returns {Promise<any>}
     */
    @Get('/:id')
    async getProductById(@Param('id') id: string): Promise<any> {
        return this.productService.getProductById(id);
    }
}
