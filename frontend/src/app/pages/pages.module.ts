import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './page-routing.module';
import { AppMaterialModule } from '../app-material.module';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { CommentsComponent } from './components/comments/comments.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule
  ],
  providers: []
})
export class PagesModule {}
