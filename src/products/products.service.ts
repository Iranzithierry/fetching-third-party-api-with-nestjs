import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, catchError, firstValueFrom } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';

@Injectable()
export class ProductsService {
    private readonly logger = new Logger(ProductsService.name);
    constructor(private readonly httpService: HttpService) { }

    async getProducts(): Promise<Observable<AxiosResponse<[], any>>> {
        const { data } = await firstValueFrom(this.httpService.get('products').pipe(
            catchError((error: AxiosError) => {
                this.logger.error(error.response.data);
                throw 'An error happened!';
            })));

        return data;
    }
    async getProductById(id: string): Promise<Observable<AxiosResponse<any, any>>> {
        const { data } = await firstValueFrom(this.httpService.get(`products/${id}`).pipe(
            catchError((error: AxiosError) => {
                this.logger.error(error.response.data);
                throw 'An error happened!';
            })
        ));
        return data;
    }
}
