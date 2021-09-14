import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {}

  logout() {
    this._authService.logout();
    this._router.navigate(['/login']);
  }
}