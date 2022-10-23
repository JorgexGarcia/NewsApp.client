import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {NewComponent} from "./pages/new/new.component";
import {ArchivedComponent} from "./pages/archived/archived.component";
import {PagesModule} from "./pages/pages.module";

const routes: Routes = [
  {
    path: '', redirectTo: 'new', pathMatch: 'full',
  },
  {
    path: 'new', component: NewComponent
  },
  {
    path: 'archived', component: ArchivedComponent
  },
  {
    path: '**', redirectTo: 'new',
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    PagesModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
