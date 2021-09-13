import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/post.service';
import { CommentsComponent } from '../comments/comments.component';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  @Input() postList :any[];

  user_id :number = 2;
  subscription$Delete ?:Subscription;
  subscription$ ?:Subscription;
  errorMessage ?:string;

  constructor(
    private _apiService: ApiService,
    private _snackBar: MatSnackBar,
    private _bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
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
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
    this.subscription$Delete?.unsubscribe();
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
}