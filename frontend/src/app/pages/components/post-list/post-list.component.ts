import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/User.models';
import { Comment } from '../../models/Comment.models';
import { Post } from '../../models/Post.models';
import { Like } from '../../models/Like.models';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  @Input() postList ?:Post[];
  @Input() errorServeur ?: string = '';

  author ?:User;
  comments ?:Comment[];
  likes ?:Like[];
  
  errorMessage ?:string = '';
  post ?:Post;
  user ?:User;

  constructor() { }

  ngOnInit(): void {
    this.author = this.post?.User;
    this.comments = this.post?.Comments;
    this.likes = this.post?.Like_posts;
  }
}