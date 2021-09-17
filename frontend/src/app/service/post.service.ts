import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from '../app.constants';
import { Comment } from '../pages/models/Comment.models';
import { Like } from '../pages/models/Like.models';
import { Post } from '../pages/models/Post.models';
import { User } from '../pages/models/User.models';
import { apiResponse } from '../_models/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  constructor(private http: HttpClient) {}

  testApi() :Observable<any> {
    return this.http.get<apiResponse>(Constants.BASE_URL).pipe(map(result => {
      return result;
    }));
  }

  createPost(post :Post, image? :File) :Observable<any> {
    const postData = new FormData();
    postData.append('post', JSON.stringify(post));
    if(image) {
      postData.append('image', image, post.titre);
    }
    return this.http.post<apiResponse>(Constants.BASE_URL + '/posts', postData).pipe(map(result => {
      return result;
    }));
  }

  getPosts() :Observable<any> {
    return this.http.get<apiResponse>(Constants.BASE_URL + '/posts').pipe(map(result => {
      return result;
    }));
  };

  getPost(postId :number) :Observable<any> {
    return this.http.get<apiResponse>(Constants.BASE_URL + '/posts' + `/${postId}`).pipe(map(result => {
      return result;
    }));
  }

  getLikes(postId :number) :Observable<any> {
    return this.http.get<apiResponse>(Constants.BASE_URL + '/posts' + `/${postId}` + '/likes').pipe(map(result => {
      return result;
    }));
  }

  likePost(postId :number, likeData :Like) :Observable<any> {
    return this.http.post<apiResponse>(Constants.BASE_URL + '/posts' + `/${postId}` + '/likes', likeData).pipe(map(result => {
      return result;
    }));
  }

  updatePost(postId :number, post :Post) :Observable<any> {
    return this.http.put<apiResponse>(Constants.BASE_URL + '/posts' + `/${postId}`, post).pipe(map(result => {
      return result;
    }));
  }

  deletePost(postId :number) :Observable<any> {
    return this.http.delete<apiResponse>(Constants.BASE_URL + '/posts' + `/${postId}`).pipe(map(result => {
      return result;
    }));
  }

  createComment(postId :number, comment: Comment) :Observable<any> {
    return this.http.post<apiResponse>(Constants.BASE_URL + '/posts' + `/${postId}` + '/comments', comment).pipe(map(result => {
      return result;
    }));
  }

  getComments(postId :number) :Observable<any> {
    return this.http.get<apiResponse>(Constants.BASE_URL + '/posts' + `/${postId}` + '/comments').pipe(map(result => {
      return result;
    }));
  }

  deleteComment(postId :number, commentId :number) :Observable<any> {
    return this.http.delete<apiResponse>(Constants.BASE_URL + '/posts' + `/${postId}` + '/comments' + `/${commentId}`).pipe(map(result => {
      return result;
    }));
  }

  // getUser(userId :number) :Observable<any> {
  //   return this.http.get<apiResponse>(Constants.BASE_URL + '/users' + `/${userId}`).pipe(map(result => {
  //     return result;
  //   }));
  // }

  // updateUserCoordonnee(userId :number, user :User) :Observable<any> {
  //   return this.http.put<apiResponse>(Constants.BASE_URL + '/users' + `/${userId}`, user).pipe(map(result => {
  //     return result;
  //   }));
  // }

  // updateUser(userId :number, image :File) :Observable<any> {
  //   const userData = new FormData();
  //   userData.append('image', image);
  //   return this.http.put<apiResponse>(Constants.BASE_URL + '/users' + `/${userId}`, userData).pipe(map(result => {
  //     return result;
  //   }));
  // }

}
