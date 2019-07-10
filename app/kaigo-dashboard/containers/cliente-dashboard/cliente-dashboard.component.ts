import {Component} from '@angular/core';
import { Cliente } from '../../models/kaigo.interface';
import { KaigoDashboardService } from '../../kaigo-dashboard.service';

@Component({
    selector: 'cliente-dashboard',
    template: `
        <div>
            <cliente-detail
                *ngFor="let cliente of clientes"
                [clienteDetail] = "cliente"
                (editCliente) = "handleEditCliente($event)"
                >
            </cliente-detail>
        </div>
    `
})
export class ClienteDashboardComponent
{
    constructor(private kaigoService: KaigoDashboardService){}

    editing: boolean = false;
    clientes: Cliente[];

    ngOnInit(){
        this.kaigoService
            .getClientes()
            .subscribe((data:Cliente[])=>this.clientes = data);
    }

    handleEditCliente(event: Cliente){
        this.kaigoService
            .updateCliente(event)
            .subscribe((data: Cliente)=>{
                this.clientes = this.clientes.map((cliente: Cliente)=>{
                    if(cliente.id === event.id){
                        cliente = Object.assign({},cliente,event);
                    }
                    return cliente;
                })
            })
    }
}