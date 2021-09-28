import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @Output() change = new EventEmitter();
  
  users ?:any[];

  constructor(
    private _userService :UserService,
    private _routes :Router
  ) { }

  ngOnInit(): void {
    // Service pour récupérer tous les utilisateurs
    this._userService.getUsers().subscribe({
      next: data => {
        console.log(data);
        this.users = data;
        console.log(this.users);
      },
      error: error => {
        console.log(error.message);
      }
    })
  }

  gotoprofil(event: any, id: number) {
    event.preventDefault();
    this._routes.navigate(['/profil', id]);
    this.change.emit(id);
  }

}
