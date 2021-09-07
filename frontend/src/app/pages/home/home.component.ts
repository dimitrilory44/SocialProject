import { Component, OnInit } from '@angular/core';
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
  posts ?:any[]; 

  constructor(private _apiService: ApiService){}

  ngOnInit() {
    this.subscription$ = this._apiService.getPosts().subscribe(res => {
      this.posts = res;
      console.log(this.posts?.length);
    })
  }

  ngOnDestroy() {
    this.subscription$?.unsubscribe();
  }

}
