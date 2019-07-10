import {Component, Input, Output} from '@angular/core';
import { Cliente, Item } from '../../models/kaigo.interface';
import { EventEmitter } from '@angular/common/src/facade/async';
import { KaigoDashboardService } from '../../kaigo-dashboard.service';

@Component({
    selector: 'cliente-detail',
    template: `
        <div>
            Cliente: <br>
            Nombre: <a *ngIf="!editing">{{clienteDetail.nombre}} </a>
            <input
                *ngIf = "editing"
                type = "text"
                [value]="clienteDetail.nombre"
                (input)="onClienteNameChange(clientename.value)"
                #clientename>
            <br>
            <div>
                Items:

                    <item-detail
                        *ngFor = "let item of clienteDetail.items"
                        [itemDetail]="item"
                        (remove)="handleRemove($event)"
                        (edit)="handleItemEdit($event, clienteDetail)">
                    </item-detail>
            </div>

            <button (click) = "toggleEdit()"> {{edit?'Done':'Edit'}}</button> <br>
            --------o--------

        </div>
    `

})
export class ClienteDetailComponent{
    
    constructor(private kaigoService: KaigoDashboardService){}
    
    editing: boolean = false;
    
    @Input()
    clienteDetail: Cliente;

    @Output()
    editCliente: EventEmitter<Cliente> = new EventEmitter<Cliente>();

    @Output()
    view: EventEmitter<Cliente> = new EventEmitter<Cliente>();

    onClienteNameChange(value: string){
        this.clienteDetail.nombre = value;
    }

    goToClientes(){
        this.view.emit(this.clienteDetail);
    }

    handleItemEdit(event: Item, cliente: Cliente){
       /* this.kaigoService
            .updateItem(event, cliente)
            .subscribe((data:Item)=>{
                this.clienteDetail.items = this.clienteDetail.items.map((item: Item)=>{
                    if(item.id === event.id){
                        item = Object.assign({},item,event);
                    }
                    return item;
                })
            })
            */
    }

    handleRemoveItem(event: Item){
        /*
        this.clienteDetail.items = this.clienteDetail.items.filter((item: Item)=>{
            return item.id !== event.id;
        });
        */
    }

    toggleEdit(){
        if(this.editing){
            this.editCliente.emit(this.clienteDetail);
        }
        this.editing = !this.editing;
    }



}