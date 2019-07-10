import {Component, Input, Output} from '@angular/core';
import { Empresa, Item } from '../../models/kaigo.interface';
import { EventEmitter } from '@angular/common/src/facade/async';
import { KaigoDashboardService } from '../../kaigo-dashboard.service';

@Component({
    selector: 'empresa-detail',
    template: `
        <div>
            Empresa: <br>
            Nombre: <a *ngIf="!editing">{{empresaDetail.nombre}} </a>
            <input
                *ngIf = "editing"
                type = "text"
                [value]="empresaDetail.nombre"
                (input)="onEmpresaNameChange(empresaname.value)"
                #empresaname>
            <br>
            <div>
                Items:

                    <item-detail
                        *ngFor = "let item of empresaDetail.items"
                        [itemDetail]="item"
                        (remove)="handleRemove($event)"
                        (edit)="handleItemEdit($event, empresaDetail)">
                    </item-detail>
            </div>

            <button (click) = "toggleEdit()"> {{edit?'Done':'Edit'}}</button> <br>
            --------o--------

        </div>
    `

})
export class EmpresaDetailComponent{
    
    constructor(private kaigoService: KaigoDashboardService){}
    
    editing: boolean = false;
    
    @Input()
    empresaDetail: Empresa;

    @Output()
    editEmpresa: EventEmitter<Empresa> = new EventEmitter<Empresa>();

    @Output()
    view: EventEmitter<Empresa> = new EventEmitter<Empresa>();

    onEmpresaNameChange(value: string){
        this.empresaDetail.nombre = value;
    }

    goToEmpresas(){
        this.view.emit(this.empresaDetail);
    }

    handleItemEdit(event: Item, empresa: Empresa){
        this.kaigoService
            .updateItem(event, empresa)
            .subscribe((data:Item)=>{
                this.empresaDetail.items = this.empresaDetail.items.map((item: Item)=>{
                    if(item.id === event.id){
                        item = Object.assign({},item,event);
                    }
                    return item;
                })
            })
    }

    handleRemoveItem(event: Item){
        this.empresaDetail.items = this.empresaDetail.items.filter((item: Item)=>{
            return item.id !== event.id;
        });
    }

    toggleEdit(){
        if(this.editing){
            this.editEmpresa.emit(this.empresaDetail);
        }
        this.editing = !this.editing;
    }



}