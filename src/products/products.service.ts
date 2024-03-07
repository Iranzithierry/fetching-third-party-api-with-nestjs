import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, catchError, firstValueFrom } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';

@Injectable()
export class ProductsService {
    private readonly logger = new Logger(ProductsService.name);
    constructor(private readonly httpService: HttpService) { }

    async getProducts(searchQuery: string): Promise<Observable<AxiosResponse<[], any>>> {
        // If searchQuery is not empty, then add it to the url
        searchQuery?.length > 0 ? searchQuery = `/search?q=${searchQuery}` : searchQuery = '';

        const { data } = await firstValueFrom(this.httpService.get(`products${searchQuery}`).pipe(
            catchError((error: AxiosError) => {
                this.logger.error(error.response.data);
                throw 'An error happened!';
            })));

        return data;
    }
    async getProductById(id: string): Promise<Observable<AxiosResponse<any, any>>> {
        try {
            const { data } = await firstValueFrom(this.httpService.get(`products/${id}`).pipe(
                catchError((error: AxiosError): Observable<AxiosResponse<any, any>> => {
                    this.logger.error(error.response.data);
                    throw error.response.data;
                })
            ));
            return data;
        } catch (error) {
            throw new HttpException(error, HttpStatus.NOT_FOUND);
        }
    }
    async createProduct(body: any): Promise<Observable<AxiosResponse<any, any>>> {

        const { data } = await firstValueFrom(this.httpService.post('products/add', body).pipe(
            catchError((error: AxiosError): Observable<AxiosResponse<any, any>> => {
                this.logger.error(error.response.data);
                throw error.response.data;
            })
        ));
        return data;

    }
}
