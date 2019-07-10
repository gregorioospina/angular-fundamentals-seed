import { Item, Empresa, Cliente } from "./models/kaigo.interface";
import {Http, Response} from '@angular/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const KAIGO_API: string = '/api/kaigo';
const ITEMS: string = 'items';

@Injectable()
export class KaigoDashboardService{
    constructor(private http: Http){
    }

    getItem(empresa: Empresa): Observable<Item[]>{
        return this.http
            .get(`${KAIGO_API}/${empresa.id}/${ITEMS}`)
            .map((res: Response)=> res.json());
    }

    getEmpresas() : Observable<Empresa[]>{
        return this.http
            .get(KAIGO_API)
            .map((response: Response)=> response.json());
    }

    getEmpresa(id: number) : Observable<Empresa>{
        return this.http
            .get(`${KAIGO_API}/${id}`)
            .map((response: Response)=> response.json());
    }
    updateEmpresa(empresa: Empresa): Observable<Empresa>{
        return this.http
            .put(`${KAIGO_API}/${empresa.id}`, empresa)
            .map((response : Response)=> response.json());
    }
    updateItem(item: Item, empresa: Empresa): Observable<Item>{
        return this.http
            .put(`${KAIGO_API}/${empresa.id}/${ITEMS}/${item.id}`, item)
            .map((response: Response)=> response.json());
    }
}
