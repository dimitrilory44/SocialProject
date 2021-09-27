import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { User } from '../../../models/User.models';

@Component({
  selector: 'app-comments',
  templateUrl: './comments-bottom.component.html'
})
export class CommentsBottomComponent implements OnInit, OnDestroy {

  subscription$ ?:Subscription;
  errorMessage ?:string;

  user :User;
  my_user :User;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: number,
    private _userService :UserService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    console.log(this.data);

    this.subscription$ = this._userService.getUser(this.user.userId).subscribe({
      next: result => {
        console.log(result);
        this.my_user = result;
      },
      error: error => {
        this.errorMessage = error.message;
        console.log(error.error);
      }
    })
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}