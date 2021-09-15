import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { PostComponent } from 'src/app/post/post.component';
import { PostService } from 'src/app/service/post.service';
import { User } from '../../models/User.models';
import { Like } from '../../models/Like.models';
import { CommentsComponent } from '../comments/comments.component';
import { Post } from '../../models/Post.models';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  @Input() postList :Post[];

  user_id :number = 2;
  subscription$Delete ?:Subscription;
  subscription$ ?:Subscription;
  errorMessage ?:string;
  likesCount: number | boolean;
  isActive: boolean = false;
  color :string;
  word :string = '';

  user :User;
  likePost :FormGroup;
  tableauString :string[] = [];

  constructor(
    private _apiService: PostService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,
    private _bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    this.subscription$ = this._apiService.getPosts().subscribe({
      next: data => {
        this.postList = data;
        console.log(this.postList);
      },
      error: error => {
        this.errorMessage = error.message;
        console.log(error.message);
      }
    });

    // Je souscris pour les likes
  }

  ngOnDestroy() {
    this.subscription$?.unsubscribe();
    this.subscription$Delete?.unsubscribe();
  }

  openDialog(id :number) {
    const dialogRef = this._dialog.open(PostComponent, {
      data : id,
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deletePost(id: number) {
    this.subscription$Delete = this._apiService.deletePost(id).subscribe({
      next: result => {
        this.openSnackBar(result.message, 'Close');
        window.location.reload();
        console.log(result.message);
      },
      error: error => {
        this.errorMessage = error.message;
        console.log(error.message);
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  openBottomSheet(id: number): void {
    this._bottomSheet.open(CommentsComponent, {
      autoFocus: true,
      data: id
    });
  }

  openBottomSheetVisualisation(id: number): void {
    this._bottomSheet.open(CommentsComponent, {
      autoFocus: false,
      data: id
    });
  }

  onLike(id: number, postCount: boolean) {
    if(postCount) {
      this.likesCount = (this.isActive) ? postCount : 0;
    } else {
      this.likesCount = (this.isActive) ? 0 : 1;
    }
    this.isActive = !this.isActive;

    const my_like = new Like();
    my_like.like = this.likesCount;
    my_like.userId = this.user.userId;

    // Liké un post
    console.log(my_like);
    console.log(id);

    this._apiService.likePost(id, my_like).subscribe({
      next: result => {
        console.log(result.message);
        location.reload();
      },
      error: error => {
        console.log(error.error.error);
      }
    })

    // Affichage colorisé like ou non
    if(this.isActive) {
      this.color = '#0d8bf0';
      console.log(this.likesCount);
    } else {
      this.color = 'grey';
      console.log(this.likesCount);
    }
	}

  getLikes(id :number) {
    this._apiService.getLikes(id).subscribe({
      next: result => {
        for(let i = 0; i < result.length ; i++) {
          this.tableauString[i] = result[i].User.nom + ' ' + result[i].User.prenom;
          console.log(this.tableauString);

          // this.tableauString.forEach(element => {
          //   this.word += element + '\n';
          // })

          // this.word = this.tableauString.join('\r');
          //&#13;
        }
      },
      error: error => {
        console.log(error.error.error);
      }
    });
  }
}