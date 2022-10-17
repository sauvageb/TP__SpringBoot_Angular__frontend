import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NavbarSearchService {

  private searchNavbarSource = new BehaviorSubject('');
  currentSearch = this.searchNavbarSource.asObservable();

  constructor() {
  }

  search(message: string) {
    this.searchNavbarSource.next(message)
  }

}
