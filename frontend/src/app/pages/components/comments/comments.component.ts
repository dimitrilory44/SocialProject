import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  comments ?:any;
  subscription$ ?:Subscription;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: number,
    private _apiService: ApiService,) { }

  ngOnInit(): void {
    console.log(this.data);

    this.subscription$ = this._apiService.getComments(this.data).subscribe(res => {
      console.log(res);
      this.comments = res;
    });

  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

}
