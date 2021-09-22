import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/service/post.service';
import { UserService } from 'src/app/service/user.service';
import { User } from '../../models/User.models';

@Component({
  selector: 'comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {

  @Input() postId ?:number;

  subscription$ :Subscription;
  comments :any;
  user :User;
  my_user :User;
  image :string = '';

  constructor(
    private _apiService :PostService,
    private _userService :UserService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    this.subscription$ = this._apiService.getComments(this.postId).subscribe(res => {
      console.log(res);
      this.comments = res;
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
  }

}
