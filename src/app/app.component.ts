import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavbarSearchService} from "./services/navbar-search.service";
import {debounceTime, fromEvent} from 'rxjs';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Book Project';

  @ViewChild('searchInput') search?: ElementRef;

  isLoggedIn: boolean = false;

  constructor(private navbarSearch: NavbarSearchService, private authService: AuthService) {
  }

  ngAfterViewInit() {
    let inputElm = this.search?.nativeElement;
    fromEvent(inputElm, 'keyup')
      .pipe(
        debounceTime(200)
      ).subscribe(res => {
      this.navbarSearch.search(inputElm.value);
    });

    this.isLoggedIn = this.authService.isConnected();
  }

  logout() {
    this.authService.signOut();
    window.location.reload();
  }
}
