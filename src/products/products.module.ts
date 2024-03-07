import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
    imports: [
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
            baseURL: 'https://dummyjson.com',
          }),
    ],
    providers: [ProductsService],
    controllers: [ProductsController],
})
export class ProductsModule {}
