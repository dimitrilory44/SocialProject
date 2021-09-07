import { Component, OnInit } from '@angular/core';
// import { Subscription } from 'rxjs';
// import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // Subscription Home
  // subscription$ ?:Subscription;

  // constructor(private _apiService: ApiService) { }

  ngOnInit(): void {
    // this.subscription$ = this._apiService.testApi().subscribe(res => {
    //   console.log(res);
    // })
  }
}