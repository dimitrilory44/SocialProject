import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../models/Post.models';
import { User } from '../models/User.models';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-post-list-page',
  templateUrl: './post-list-page.component.html',
  styleUrls: ['./post-list-page.component.scss']
})
export class PostListPageComponent implements OnInit {

  postByUser ?:Post[] = [];
  user :User;
  postUser :User;
  prenom ?:User;
  nom ?:User;
  image ?:User;
  email ?:User;
  telephone ?:User;
  mailTo :string = '';
  telTo :string = '';
  data :any[];
  
  constructor(
    private _activeRoute :ActivatedRoute,
    private _userService :UserService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    this._activeRoute.paramMap.subscribe((res:any) => {
      this._userService.getPostByUser(res.get("id")).subscribe({
        next: data => {
          console.log(data);
          this.data = data;
          if (data) {
            this.prenom = data.prenom;
            this.nom = data.nom;
            this.email = data.email;
            this.telephone = data.telephone;
            this.image = data.image;
            this.postByUser = data.Posts;
            console.log(this.postByUser);
          }
        },
        error: error => {
          console.log(error.message);
        }
      })
    });
  }

  gotoMail() {
    this.mailTo = 'mailto:' + this.user.email
    window.location.href = this.mailTo;
  }

  gotoTel() {
    this.telTo = 'tel:' + this.telephone
    window.location.href = this.telTo;
  }
}