import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Subscription Home
  subscription$ ?:Subscription;
  subscription$Delete ?:Subscription;
  posts ?:any[]; 

  constructor(
    private _apiService: ApiService,
    private _router: Router
  ){}

  ngOnInit() {
    this.subscription$ = this._apiService.getPosts().subscribe(res => {
      this.posts = res;
      console.log(this.posts);
    });
  }

  ngOnDestroy() {
    this.subscription$?.unsubscribe();
    this.subscription$Delete?.unsubscribe();
  }

  deletePost(id: number) {
    this.subscription$Delete = this._apiService.deletePost(id).subscribe(
      () => {
        console.log('Le post a été supprimé');
        window.location.reload();
      },
      error => {
        console.log(error);
      }
    );
  }

}
