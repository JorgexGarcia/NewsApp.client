import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SidebarComponent} from "./sidebar/sidebar.component";
import {RouterModule} from "@angular/router";
import { LoadingComponent } from './loading/loading.component';



@NgModule({
  declarations: [
    SidebarComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SidebarComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
