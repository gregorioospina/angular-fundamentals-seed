import {Component, OnInit} from '@angular/core';

import 'rxjs/add/operator/switchMap';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { KaigoDashboardService } from '../../kaigo-dashboard.service';
import { Empresa } from '../../models/kaigo.interface';

@Component({
    selector: 'empresa-viewer',
    template: `
    <div>
        <empresa-form
            [empresaDetail] = "empresa"
            (update) = "onUpdateEmpresa($event)"
            >
        </empresa-form>
        <br>
        <button (click)="goBack()">
            &lsaquo; Go Back
        </button>
    </div>
    `
})
export class EmpresaViewerComponent implements OnInit{
    empresa: Empresa;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private kaigoService: KaigoDashboardService
    ){}
    ngOnInit(){
        this.route.params
            .switchMap((data: Empresa)=> this.kaigoService.getEmpresa(data.id))
            .subscribe((data: Empresa)=> this.empresa = data)
    }

    goBack(){
        this.router.navigate(['/empresas']);
    }

    onUpdateEmpresa(event: Empresa){
        console.log(event);
        this.kaigoService
            .updateEmpresa(event)
            .subscribe((data: Empresa)=>{
                this.empresa = Object.assign({}, this.empresa, event)
            })
    }

}