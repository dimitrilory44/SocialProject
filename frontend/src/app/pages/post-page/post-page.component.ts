import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/service/post.service';
import { UserService } from 'src/app/service/user.service';
import { Post } from '../models/Post.models';
import { User } from '../models/User.models';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post ?:Post;
  user ?:User;
  my_user :User;
  image :string = '';

  errorServeur ?:string = '';

  constructor(
    private _activeRoute :ActivatedRoute,
    private _userService :UserService,
    private _apiService: PostService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    this._activeRoute.paramMap.subscribe((res:any) => {
      this._apiService.getPost(res.get("id")).subscribe({
        next: data => {
          console.log(data);
          this.post = data;
        },
        error: error => {
          this.errorServeur = error.message;
          console.log(error.message);
        }
      })
    });

    this._userService.getUser(this.user.userId).subscribe({
      next: result => {
        console.log(result);
        this.my_user = result;
        this.image = this.my_user.image;
      },
      error: error => {
        this.errorServeur = error.message;
        console.log(error.error);
      }
    })
  }
}