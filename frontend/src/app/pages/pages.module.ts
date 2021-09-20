import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './page-routing.module';
import { AppMaterialModule } from '../app-material.module';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { CommentsComponent } from './components/comments/comments.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { UpdatePostComponent } from './components/post-update/post-update.component';
import { ProfilComponent } from './profil/profil.component';
import { PostComponent } from './components/post/post.component';
import { PostPageComponent } from './post-page/post-page.component';
import { PostListPageComponent } from '../post-list-page/post-list-page.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    CommentsComponent,
    PostListComponent,
    UpdatePostComponent,
    ProfilComponent,
    PostComponent,
    PostPageComponent,
    PostListPageComponent
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
