import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/service/post.service';
import { UserService } from 'src/app/service/user.service';
import { WebSocketService } from 'src/app/_services/web-socket.service';
import { Comment } from '../../../models/Comment.models';
import { User } from '../../../models/User.models';

@Component({
  selector: 'comment-list',
  templateUrl: './comment-list.component.html'
})
export class CommentListComponent implements OnInit {

  @Input() postId ?:number;

  subscription$ :Subscription;
  subscriptionMessage$ ?:Subscription;
  comments ?:Comment[];
  user :any;
  my_user :User;
  image :string = '';
  lenght :number;
  isComment :boolean = false;

  commentTemp ?: any;

  constructor(
    private _apiService :PostService,
    private _userService :UserService,
    private _webService :WebSocketService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    this.subscription$ = this._apiService.getComments(this.postId).subscribe(res => {
      console.log(res);
      this.comments = res;
      this.lenght = this.comments.length;
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
}