import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/Post.models';
import { PostService } from '../../shared/post.service';
import { mimeType } from './mime-type.validator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../sass/pages/_home.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  createPostSubscription$ :Subscription;
  posts ?:any[]; 
  file?: File;
  url ?:string;
  errorMessage ?:string;
  user_id :number = 2;

  createPost :FormGroup;

  constructor(
    private _apiService: PostService,
    private _formBuilder :FormBuilder,
    private _snackBar: MatSnackBar
  ){}

  ngOnInit() {
    this.createPost = this._formBuilder.group({
      titre : ['post_image', Validators.required],
      contenu : ['', Validators.required],
      image: [null, Validators.required, mimeType],
      UserId: this.user_id
    });
  }

  ngOnDestroy() :void {
    this.createPostSubscription$?.unsubscribe();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  onSelectFile(e :any) {
    if(e.target.files && e.target.files[0]){      
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        this.url = reader.result as string;
      }
      this.file = e.target.files[0];
      this.createPost.get('image').updateValueAndValidity();
    }
  }

  onSubmit() {
    if(this.createPost.invalid) {
      return;
    }
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
}