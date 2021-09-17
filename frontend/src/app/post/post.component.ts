import { Component, OnInit, Inject, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Post } from '../pages/models/Post.models';
import { PostService } from '../service/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  subscription$ ?:Subscription;
  post :Post;
  errorMessage ?:string;

  updatePost :FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder :FormBuilder,
    private _apiService :PostService,
    private _snackBar :MatSnackBar
  ) { }
 
 ngOnInit() {
   console.log(this.data);
   this.subscription$ = this._apiService.getPost(this.data).subscribe({
    next: data => {
      this.post = data;
      console.log(this.post);
      console.log(this.post.contenu);
      
      this.updatePost.controls.contenu.setValue(this.post.contenu);
      this.updatePost.controls.image.setValue(this.post.image);
    },
    error: error => {
      this.errorMessage = error.message;
      console.log(error.message);
    }
  });
  
  this.updatePost = this._formBuilder.group({
   contenu : ['', Validators.required],
   image: [null, Validators.required]
  });

 }

 openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action, {
    horizontalPosition: 'center',
    verticalPosition: 'top'
  });
}

 onSubmitUpdate() {
  console.log(this.updatePost.value);

  let post = new Post();
  post.contenu = this.updatePost.get('contenu').value;
  post.image = this.updatePost.get('image').value;

  this._apiService.updatePost(this.data, post).subscribe({
    next: result => {
      this.openSnackBar(result.message, 'fermer');
      setTimeout(function(){ 
        location.reload();
      }, 1500);
    },
    error: error => {
      this.errorMessage = error.message;
      console.log(error.message);
    }
  })
 }

}
