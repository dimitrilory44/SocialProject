import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Comment } from 'src/app/pages/models/Comment.models';
import { PostService } from 'src/app/service/post.service';
import { UserService } from 'src/app/service/user.service';
import { WebSocketService } from '../../../_services/web-socket.service';
import { User } from '../../models/User.models';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  comments ?:any;
  subscription$ ?:Subscription;
  subscriptionMessage$ ?:Subscription;
  lenght :number;
  my_user :User;
  errorMessage ?:string;
  image :string = '';

  user :User;

  commentTemp ?: any;
  createComment :FormGroup;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: number,
    private _apiService: PostService,
    private _userService: UserService,
    private _formBuilder :FormBuilder,
    private _snackBar: MatSnackBar,
    private _webService: WebSocketService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    console.log(this.data);

    this.subscription$ = this._apiService.getComments(this.data).subscribe(res => {
      console.log(res);
      this.comments = res;
      this.lenght = this.comments.length;
    });

    this.createComment = this._formBuilder.group({
      contenu : ['', Validators.required],
      UserId: this.user.userId
    });

    this._userService.getUser(this.user.userId).subscribe({
      next: result => {
        console.log(result);
        this.my_user = result;
        this.image = this.my_user.image;
      },
      error: error => {
        // this.errorMessage = error.message;
        console.log(error.error);
      }
    })

    this.subscriptionMessage$ = this._webService.getNewMessage().subscribe((message: any) => {
      console.log(message);
      this.commentTemp = message;
    });
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
    this.subscriptionMessage$.unsubscribe();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  onSubmitComment() {
    console.log(this.createComment.value);

    const comment = new Comment();
    comment.contenu = this.createComment.get('contenu').value;
    comment.UserId = this.createComment.get('UserId').value;

    const commentTemp = {
      "contenu": this.createComment.get('contenu').value,
      "PostId": this.data,
      "image": this.image,
      "nom": this.user.nom,
      "prenom": this.user.prenom,
      "createdAt": new Date()
    }

    console.log(comment);
    this._webService.sendMessage(commentTemp);

    this._apiService.createComment(this.data, comment).subscribe({
      next: result => {
        this.openSnackBar(result.message, 'fermer');
        setTimeout(function(){ 
          location.reload();
        }, 1500);
      },
      error: error => {
        this.errorMessage = error.message;
        console.log(error.error);
      }
    })
  }
  
  deleteComment(id: number) {
    this._apiService.deleteComment(this.data, id).subscribe({
      next: result => {
        this.openSnackBar(result.message, 'fermer');
        setTimeout(function(){ 
          location.reload();
        }, 1500);
      },
      error: error => {
        this.errorMessage = error.message;
        console.log(error.error);
      }
    })
  }

}
