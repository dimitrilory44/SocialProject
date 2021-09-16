import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from '../../models/User.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userHeader :User;

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userHeader = JSON.parse(localStorage.getItem('currentUser'));
  }

  logout() {
    this._authService.logout();
    this._router.navigate(['/login']);
  }
}