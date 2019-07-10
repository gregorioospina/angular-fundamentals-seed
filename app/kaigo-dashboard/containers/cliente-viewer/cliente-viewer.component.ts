import {Component, OnInit} from '@angular/core';

import 'rxjs/add/operator/switchMap';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { KaigoDashboardService } from '../../kaigo-dashboard.service';
import { Cliente } from '../../models/kaigo.interface';

@Component({
    selector: 'cliente-viewer',
    template: `
    <div>
        <cliente-form
            [clienteDetail] = "cliente"
            (update) = "onUpdateCliente($event)"
            >
        </cliente-form>
        <br>
        <button (click)="goBack()">
            &lsaquo; Go Back
        </button>
    </div>
    `
})
export class ClienteViewerComponent implements OnInit{
    cliente: Cliente;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private kaigoService: KaigoDashboardService
    ){}
    ngOnInit(){
        this.route.params
            .switchMap((data: Cliente)=> this.kaigoService.getCliente(data.id))
            .subscribe((data: Cliente)=> this.cliente = data)
    }

    goBack(){
        this.router.navigate(['/clientes']);
    }

    onUpdateCliente(event: Cliente){
        console.log(event);
        this.kaigoService
            .updateCliente(event)
            .subscribe((data: Cliente)=>{
                this.cliente = Object.assign({}, this.cliente, event)
            })
    }

}