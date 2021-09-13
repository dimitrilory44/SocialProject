import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Comment } from 'src/app/models/Comment.models';
import { PostService } from 'src/app/shared/post.service';
import { WebSocketService } from 'src/app/shared/web-socket.service';

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
  user_id :number = 2;
  errorMessage ?:string;

  commentTemp ?: any;
  createComment :FormGroup;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: number,
    private _apiService: PostService,
    private _formBuilder :FormBuilder,
    private _snackBar: MatSnackBar,
    private _webService: WebSocketService
  ) { }

  ngOnInit(): void {
    console.log(this.data);

    this.subscription$ = this._apiService.getComments(this.data).subscribe(res => {
      console.log(res);
      this.comments = res;
      this.lenght = this.comments.length;
    });

    this.createComment = this._formBuilder.group({
      contenu : ['', Validators.required],
      UserId: this.user_id
    });

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
      "nom": "lory",
      "prenom": "dimitri",
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
