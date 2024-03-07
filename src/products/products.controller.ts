import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { Product } from 'src/interfaces/product';

@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService) { }
    /**
     * 
     * @param searchQuery
     * @returns 
    */
    @Get('/')
    @ApiQuery({ name: 'search', required: false })
    async getProducts(@Query('search') searchQuery?: string): Promise<any> {
        return this.productService.getProducts(searchQuery);
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
    /**
     * 
     * @param body 
     * @returns 
     */
    @Post('/')
    async createProduct(@Body() body: Product): Promise<any> {
        return this.productService.createProduct(body);
    }
}
