import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  loginForm :FormGroup;
  errorMessage :string = '';
  submitted = false;

  constructor(
    private _authService :AuthService,
    private _router: Router,
    private _formBuilder :FormBuilder
  ) { }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmitLogin() {
    this.submitted = true;

    this._authService.login(this.loginForm.value).subscribe({
      next: result => {
        localStorage.setItem("token", JSON.stringify(result.token));
        
        let respBody = result;
        let user = JSON.stringify(respBody);
        localStorage.setItem('currentUser', user);

        this._router.navigate(['/']);
      },
      error: error => {
        this.errorMessage = error.error.error;
      }
    });
  }

}
