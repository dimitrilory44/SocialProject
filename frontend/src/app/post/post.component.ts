import { Component, OnInit, Inject, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    private _apiService :PostService
  ) { }
 
 ngOnInit() {
   console.log(this.data);
   this.subscription$ = this._apiService.getPost(this.data).subscribe({
    next: data => {
      this.post = data;
      console.log(this.post);
      console.log(this.post.contenu);
    },
    error: error => {
      this.errorMessage = error.message;
      console.log(error.message);
    }
   });

   this.updatePost = this._formBuilder.group({
    titre : ['post_image', Validators.required],
    contenu : ['', Validators.required],
    image: [null, Validators.required]
   });

   this.updatePost.controls.contenu.setValue(this.post.contenu);
 }


 onSubmitUpdate() {
  console.log(this.updatePost.value);
 }

}
