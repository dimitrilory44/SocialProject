import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/Post.models';
import { ApiService } from '../../shared/api.service';
import { mimeType } from './mime-type.validator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatAccordion } from '@angular/material/expansion';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CommentsComponent } from '../components/comments/comments.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../sass/pages/_home.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;

  // Subscription Home
  subscription$ ?:Subscription;
  subscription$Delete ?:Subscription;
  posts ?:any[]; 
  file?: File;
  url ?:string;
  errorMessage ?:string;
  postEnvoye :any[];
  user_id :number = 2;

  isActive:boolean = false;

  createPost :FormGroup;

  constructor(
    private _apiService: ApiService,
    private _formBuilder :FormBuilder,
    private _snackBar: MatSnackBar,
    private _bottomSheet: MatBottomSheet
  ){}

  ngOnInit() {
    this.subscription$ = this._apiService.getPosts().subscribe({
      next: data => {
        this.posts = data;
        console.log(this.posts);
      },
      error: error => {
        this.errorMessage = error.message;
        console.log(error.message);
      }
    });

    this.createPost = this._formBuilder.group({
      titre : ['post_image', Validators.required],
      contenu : ['', Validators.required],
      image: [null, Validators.required, mimeType],
      UserId: this.user_id
    });
  }

  ngOnDestroy() {
    this.subscription$?.unsubscribe();
    this.subscription$Delete?.unsubscribe();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  onSelectFile(e :any) {
    if(e.target.files && e.target.files[0]){
      
      // Affichage de l'image
      let reader = new FileReader();
      
      reader.readAsDataURL(e.target.files[0]);
      
      reader.onload = () => {
        this.url = reader.result as string;
      }
      
      this.file = e.target.files[0];
      // this.createPost.get('image').patchValue(this.file);
      this.createPost.get('image').updateValueAndValidity();
    }
  }

  deletePost(id: number) {
    this.subscription$Delete = this._apiService.deletePost(id).subscribe({
      next: result => {
        this.openSnackBar(result.message, 'Close');
        window.location.reload();
        console.log(result.message);
      },
      error: error => {
        this.errorMessage = error.message;
        console.log(error.message);
      }
    });
  }

  onSubmit() {
    if(this.createPost.invalid) {
      return;
    }
    
    // this.postEnvoye = this.createPost.value;

    const post = new Post();
    post.titre = this.createPost.get('titre').value;
    post.contenu = this.createPost.get('contenu').value;
    post.image = '';
    post.UserId = this.createPost.get('UserId').value;

    this._apiService.createPost(post, this.file).subscribe({
      next: result => {
        this.openSnackBar(result.message, 'fermer');
        window.location.reload();
        console.log(result.message);
      },
      error: error => {
        this.errorMessage = error.message;
        console.log(error.error);
      }
    })
  }

  openBottomSheet(id: number): void {
    this._bottomSheet.open(CommentsComponent, {
      autoFocus: true,
      data: id
    });
  }

  openBottomSheetVisualisation(id: number): void {
    this._bottomSheet.open(CommentsComponent, {
      autoFocus: false,
      data: id
    });
  }

}
