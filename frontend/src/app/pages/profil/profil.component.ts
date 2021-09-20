import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { User } from '../models/User.models';
import { Constants } from '../../app.constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mimeType } from '../home/mime-type.validator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit, OnDestroy {

  @Output() change = new EventEmitter();

  user :User;
  userSouscription$ :Subscription;
  upload_api :string = Constants.BASE_UPLOAD;
  filename :string;
  image :string = '';
  telephone :string = '';
  file: File;
  my_user :User;
  mailTo :string = '';
  telTo :string = '';

  updateUser :FormGroup;

  constructor(
    private _formBuilder :FormBuilder,
    private _routes :Router,
    private _userService :UserService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    this.userSouscription$ = this._userService.getUser(this.user.userId).subscribe({
      next: result => {
        console.log(result);
        this.my_user = result;
        this.image = this.my_user.image;
        this.telephone = this.my_user.telephone;

        this.updateUser.controls.image.setValue(this.image);
      },
      error: error => {
        // this.errorMessage = error.message;
        console.log(error.error);
      }
    })

    this.updateUser = this._formBuilder.group({
      image: [null, Validators.required, mimeType]
    });

  }

  ngOnDestroy() {
    this.userSouscription$.unsubscribe();
  }

  onSelectFile(e :any) {
    if(e.target.files && e.target.files[0]){      
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        this.image = reader.result as string;
      }
      this.file = e.target.files[0];
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  gotoMail() {
    this.mailTo = 'mailto:' + this.user.email
    window.location.href = this.mailTo;
  }

  gotoTel() {
    this.telTo = 'tel:' + this.telephone
    window.location.href = this.telTo;
  }

  onSubmitUser() {
    this._userService.updateUser(this.user.userId, this.file).subscribe({
        next: result => {
          this.openSnackBar(result.message, 'fermer');
          window.location.reload();
          console.log(result.message);
        },
        error: error => {
          // this.errorMessage = error.message;
          console.log(error.error);
        }
    })
  }

  showPost(event :any, id: number) {
    event.preventDefault();
    this._routes.navigate(['/profil', id]);
    this.change.emit(id);
  }
}