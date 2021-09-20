import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../pages/models/Post.models';
import { User } from '../pages/models/User.models';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-post-list-page',
  templateUrl: './post-list-page.component.html',
  styleUrls: ['./post-list-page.component.scss']
})
export class PostListPageComponent implements OnInit {

  postByUser ?:Post[] = [];
  user :User;
  postUser :User;
  prenom :User;
  nom :User;
  image :User;
  
  constructor(
    private _activeRoute :ActivatedRoute,
    private _userService :UserService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    this._activeRoute.paramMap.subscribe((res:any) => {
      this._userService.getPostByUser(res.get("id")).subscribe({
        next: data => {
          console.log(data[0]);
          this.prenom = data[0].prenom;
          this.nom = data[0].nom;
          this.image = data[0].image;
          this.postByUser = data[0].Posts;
          console.log(this.postByUser);
        },
        error: error => {
          console.log(error.message);
        }
      })
    });
  }

}
