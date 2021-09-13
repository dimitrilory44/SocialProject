import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from './shared/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  // Subscription Home
  subscription$ ?:Subscription;

  constructor(
    private _apiService: PostService
  ) { }
  
  ngOnInit(): void {
    this.subscription$ = this._apiService.testApi().subscribe(res => {
      console.log(res.title);
    })
  }

}
