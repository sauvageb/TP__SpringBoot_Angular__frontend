import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavbarSearchService} from "./services/navbar-search.service";
import {debounceTime, fromEvent} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Book Project';

  @ViewChild('searchInput') search?: ElementRef;

  constructor(private navbarSearch: NavbarSearchService) {
  }

  ngAfterViewInit() {
    let inputElm = this.search?.nativeElement;
    fromEvent(inputElm, 'keyup')
      .pipe(
        debounceTime(200)
      ).subscribe(res => {
      this.navbarSearch.search(inputElm.value);
    });
  }

}
