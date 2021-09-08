import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './components/header/header.component';

import { HttpClientModule } from '@angular/common/http';
import { PagesRoutingModule } from './page-routing.module';
import { AppMaterialModule } from '../app-material.module';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    HttpClientModule,
    AppMaterialModule
  ],
  providers: []
})
export class PagesModule {}
