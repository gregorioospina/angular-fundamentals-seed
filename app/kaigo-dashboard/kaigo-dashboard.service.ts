import { Item, Cliente } from "./models/kaigo.interface";
import {Http, Response} from '@angular/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const KAIGO_API: string = 'api/clientes';
const ITEMS: string = 'items';

@Injectable()
export class KaigoDashboardService{
    constructor(private http: Http){
    }

    getItem(cliente: Cliente): Observable<Item[]>{
        return this.http
            .get(`${KAIGO_API}/${cliente.id}/${ITEMS}`)
            .map((res: Response)=> res.json());
    }

    getClientes() : Observable<Cliente[]>{
        return this.http
            .get(KAIGO_API)
            .map((response: Response)=> response.json());
    }

    getCliente(id: number) : Observable<Cliente>{
        return this.http
            .get(`${KAIGO_API}/${id}`)
            .map((response: Response)=> response.json());
    }
    updateCliente(cliente: Cliente): Observable<Cliente>{
        return this.http
            .put(`${KAIGO_API}/${cliente.id}`, cliente)
            .map((response : Response)=> response.json());
    }
    updateItem(item: Item, cliente: Cliente): Observable<Item>{
        return this.http
            .put(`${KAIGO_API}/${cliente.id}/${ITEMS}/${item.id}`, item)
            .map((response: Response)=> response.json());
    }
}
