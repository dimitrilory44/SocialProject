import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UserService } from 'src/app/service/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserListComponent } from '../../components/user-list/user-list.component';
import { User } from '../../models/User.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userHeader :User;
  user :User;
  image :string = '';
  width :number;

  myControl = new FormControl();
  options: any[] = [
    {name: 'Mary'},
    {name: 'Shelley'},
    {name: 'Igor'}
  ];
  filteredOptions: Observable<User[]>;

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _userService: UserService,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.userHeader = JSON.parse(localStorage.getItem('currentUser'));

    this.width = window.innerWidth;

    this._userService.getUser(this.userHeader.userId).subscribe({
      next: result => {
        console.log(result);
        this.user = result;
        this.image = this.user.image;
      },
      error: error => {
        // this.errorMessage = error.message;
        console.log(error.error);
      }
    });

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );

  }

  openDialog(): void {
    const dialogRef = this._dialog.open(UserListComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  displayFn(user: any): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  logout() {
    this._authService.logout();
    this._router.navigate(['/login']);
  }
}