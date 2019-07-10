import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { KaigoDashboardService } from './kaigo-dashboard.service';
import { ClienteDashboardComponent } from './containers/cliente-dashboard/cliente-dashboard.component';
import { ClienteViewerComponent } from './containers/cliente-viewer/cliente-viewer.component';
import { empty } from 'rxjs/Observer';
import { ClienteDetailComponent } from './components/cliente-detail/cliente-detail.component';
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';

const routes: Routes =[
    {
        path: 'clientes',
        children:[
            {
                path: '',
                component: ClienteDashboardComponent
            },{
                path: 'id',
                component: ClienteViewerComponent
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
        ClienteDashboardComponent,
        ClienteFormComponent,
        ClienteViewerComponent,
        ClienteFormComponent,
        ItemDetailComponent,
        ClienteDetailComponent
    ],
    exports: [
        ClienteViewerComponent
    ],
    providers:[
        KaigoDashboardService
    ]
})
export class KaigoDashboardModule{

}