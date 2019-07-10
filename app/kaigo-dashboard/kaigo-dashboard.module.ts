import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { KaigoDashboardService } from './kaigo-dashboard.service';
import { EmpresaDashboardComponent } from './containers/empresa-dashboard/empresa-dashboard.component';
import { EmpresaViewerComponent } from './containers/empresa-viewer/empresa-viewer.component';
import { empty } from 'rxjs/Observer';
import { EmpresaDetailComponent } from './components/empresa-detail/empresa-detail.component';
import { EmpresaFormComponent } from './components/empresa-form/empresa-form.component';

const routes: Routes =[
    {
        path: 'empresas',
        children:[
            {
                path: '',
                component: EmpresaDashboardComponent
            },{
                path: 'id',
                component: EmpresaViewerComponent
            }
        ]
    }
]

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        HttpModule,
        RouterModule.forChild(routes)
    ],
    declarations:[
        EmpresaDashboardComponent,
        EmpresaFormComponent,
        EmpresaViewerComponent,
        EmpresaFormComponent,
        ItemDetailComponent,
        EmpresaDetailComponent
    ],
    exports: [
        EmpresaViewerComponent
    ],
    providers:[
        KaigoDashboardService
    ]
})
export class KaigoDashboardModule{

}