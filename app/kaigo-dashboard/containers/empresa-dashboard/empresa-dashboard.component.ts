import {Component} from '@angular/core';
import { Empresa } from '../../models/kaigo.interface';
import { KaigoDashboardService } from '../../kaigo-dashboard.service';

@Component({
    selector: 'empresa-dashboard',
    template: `
        <div>
            <empresa-detail
                *ngFor="let empresa of empresas"
                [empresaDetail] = "empresa"
                (editEmpresa)="handleEditEmpresa($event)">
            </empresa-detail>
        </div>
    `
})
export class EmpresaDashboardComponent
{
    constructor(private kaigoService: KaigoDashboardService){}

    editing: boolean = false;
    empresas: Empresa[];

    ngOnInit(){
        this.kaigoService
            .getEmpresas()
            .subscribe((data:Empresa[])=>this.empresas = data);
    }

    handleEditEmpresa(event: Empresa){
        this.kaigoService
            .updateEmpresa(event)
            .subscribe((data: Empresa)=>{
                this.empresas = this.empresas.map((empresa: Empresa)=>{
                    if(empresa.id === event.id){
                        empresa = Object.assign({},empresa,event);
                    }
                    return empresa;
                })
            })
    }
}