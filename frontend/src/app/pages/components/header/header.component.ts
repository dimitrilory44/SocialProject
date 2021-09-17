import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from '../../models/User.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userHeader :User;
  image :string = '';

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this.userHeader = JSON.parse(localStorage.getItem('currentUser'));

    this._userService.getUser(this.userHeader.userId).subscribe({
      next: result => {
        console.log(result);
        let my_user = result;
        this.image = my_user.image;
      },
      error: error => {
        // this.errorMessage = error.message;
        console.log(error.error);
      }
    });

  }

  logout() {
    this._authService.logout();
    this._router.navigate(['/login']);
  }
}