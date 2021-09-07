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

  constructor(private _apiService: ApiService){}

  ngOnInit() {
    this.subscription$ = this._apiService.getPosts().subscribe(res => {
      console.log(res);
    })
  }

  ngOnDestroy() {
    this.subscription$?.unsubscribe();
  }

}
