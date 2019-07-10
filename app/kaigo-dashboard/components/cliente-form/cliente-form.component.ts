import {Component, Input, Output, EventEmitter} from '@angular/core';
import { Cliente } from '../../models/kaigo.interface';

@Component({
    selector: 'cliente-form',
    styleUrls: ['cliente-form.styles.scss'],
    template:`
        <form (ngSubmit)="handleSubmit(form.value,form.valid)" #form= "ngForm" novalidate>
            <div>
                Nombre de la Cliente:
                <input
                    type="text"
                    name="nombre"
                    required
                    #nombre="ngModel"
                    [ngModel]="clienteDetail?.nombre">
            </div>
                <div *ngIf = "nombre.errors?.required && nombre.dirty" class = "error">
                    Nombre de la cliente es requerido
                </div>
            <button type = "submit" [disabled]="form.invalid">
                Update Cliente
            </button>
        </form>
    
    `
})
export class ClienteFormComponent{

    @Input()
    clienteDetail: Cliente;

    @Output()
    update: EventEmitter<Cliente> = new EventEmitter<Cliente>();

    handleSubmit(cliente: Cliente, isValid: boolean){
        if(isValid){
            this.update.emit(cliente);
        }
    }

}