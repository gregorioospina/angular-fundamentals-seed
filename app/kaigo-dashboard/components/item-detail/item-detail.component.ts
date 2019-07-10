import {CommonModule} from '@angular/common';
import {Component, Input, Output} from '@angular/core';
import { EventEmitter } from '@angular/common/src/facade/async';
import { Item } from '../../models/kaigo.interface';

@Component({
    selector: 'item-detail',
    template: `
        <div>
            Detalle Item <br>
            ID: <a>{{itemDetail.id}}</a> 
            Nombre: <a *ngIf="!edit"> {{itemDetail.nombre}} </a>
            <input
                *ngIf="edit"
                type="text"
                [value] = "detail.nombre"
                (input) = "onItemNameChange(itemname.value)"
                #itemname>
            <br>
            <div>
                Caracteristicas: <br>
                <ul>
                    <li *ngFor="let caracteristica of itemDetail.caracteristicas">
                    {{caracteristica.key}} : {{caracteristica.value}}
                    </li>
                </ul>
            </div>
                <div>
                    <button (click)="toggleEdit()">{{editing?'Done':'Edit'}}</button>
                    <button (click)="onRemove()">Remove</button>
                </div>
        </div>
    `
})
export class ItemDetailComponent{

    constructor(){}
    
    editing: boolean = false;

    nombre: string= "";
    
    @Input()
    itemDetail: Item;

    @Output()
    edit: EventEmitter<Item> = new EventEmitter<Item>();

    @Output()
    view: EventEmitter<Item> = new EventEmitter<Item>();

    @Output()
    remove: EventEmitter<Item> = new EventEmitter<Item>();

    onRemove()
    {
        this.remove.emit(this.itemDetail);
    }

    onItemNameChange(value: string){
        this.itemDetail.nombre = value;
    }

    toggleEdit(){
        if(this.editing)
        {
            this.edit.emit(this.itemDetail);
        }
        this.editing = !this.editing;
    }

    handleblur(event: any){
        this.nombre = this.itemDetail.nombre;
    }



}
