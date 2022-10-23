import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NewComponent} from "./new/new.component";
import { ArchivedComponent } from './archived/archived.component';
import {PipeModule} from "../pipes/pipe.module";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    NewComponent,
    ArchivedComponent
  ],
  imports: [
    CommonModule,
    PipeModule,
    NgxSkeletonLoaderModule.forRoot({animation: 'pulse', loadingText: 'Cargando...'}),
    SharedModule,
  ],
  exports: [
    NewComponent
  ]
})
export class PagesModule { }
