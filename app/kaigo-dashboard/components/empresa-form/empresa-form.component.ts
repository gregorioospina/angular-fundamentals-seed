import {Component, Input, Output, EventEmitter} from '@angular/core';
import { Empresa } from '../../models/kaigo.interface';

@Component({
    selector: 'empresa-form',
    styleUrls: ['empresa-form.styles.scss'],
    template:`
        <form (ngSubmit)="handleSubmit(form.value,form.valid)" #form= "ngForm" novalidate>
            <div>
                Nombre de la Empresa:
                <input
                    type="text"
                    name="nombre"
                    required
                    #nombre="ngModel"
                    [ngModel]="empresaDetail?.nombre">
            </div>
                <div *ngIf = "nombre.errors?.required && nombre.dirty" class = "error">
                    Nombre de la empresa es requerido
                </div>
            <button type = "submit" [disabled]="form.invalid">
                Update Empresa
            </button>
        </form>
    
    `
})
export class EmpresaFormComponent{

    @Input()
    empresaDetail: Empresa;

    @Output()
    update: EventEmitter<Empresa> = new EventEmitter<Empresa>();

    handleSubmit(empresa: Empresa, isValid: boolean){
        if(isValid){
            this.update.emit(empresa);
        }
    }

}