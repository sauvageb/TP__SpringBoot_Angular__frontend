import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  userConnected: any = {};

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isConnected();
    this.userConnected = this.authService.getConnectedUser();
  }

  onSubmit(): void {
    const {username, password} = this.form;

    this.authService.login(username, password).subscribe({
      next: (data: any) => {

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      error: (err: any) => {
        this.errorMessage = "An Error happened";
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  logout() {
    this.authService.signOut();
    window.location.reload();
  }
}
