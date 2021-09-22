import { AfterContentInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/service/user.service';
import { mimeType } from '../../home/mime-type.validator';
import { User } from '../../models/User.models';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit, AfterContentInit {

  user :User;
  file :File;
  image :string = '';
  telephone :string = '';

  updateUser :FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User,
    private _userService :UserService,
    private _formBuilder :FormBuilder,
    private _snackBar :MatSnackBar
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    console.log(this.data);

    this.image = this.data.image;
    this.telephone = this.data.telephone;
    
    this.updateUser = this._formBuilder.group({
      image: [null, Validators.required, mimeType],
      telephone: ['', Validators.required]
    });
  }

  ngAfterContentInit() {
    this.updateUser.controls.telephone.setValue(this.telephone);
  }

  onSelectFile(e :any) {
    if(e.target.files && e.target.files[0]){      
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        this.image = reader.result as string;
      }
      this.file = e.target.files[0];
      this.updateUser.get('image').updateValueAndValidity();
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  onSubmitUser() {
    const user = new User();
    user.telephone = this.updateUser.get('telephone').value;
    user.image = this.image;

    console.log(this.updateUser.value);

    this._userService.updateUser(this.user.userId, user, this.file).subscribe({
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

}
