import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {TokenStorageService} from "./token-storage.service";

const AUTH_API = 'http://localhost:8080/api/auth';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${AUTH_API}/signup`, {
      username,
      email,
      password
    }, httpOptions);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${AUTH_API}/signin`, {
      username,
      password
    }, httpOptions)
      .pipe(
        map((data: any) => {
          this.tokenStorage.saveToken(data.token);
          this.tokenStorage.saveUser(data);
          return this.tokenStorage.getUser();
        })
      );
  }

  isConnected(): boolean {
    return this.tokenStorage.getToken() ? true : false;
  }

  getConnectedUser() {
    return this.tokenStorage.getUser();
  }

  signOut() {
    this.tokenStorage.clearSession();
  }
}
