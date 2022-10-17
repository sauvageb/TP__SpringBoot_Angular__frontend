import {Component, OnInit} from '@angular/core';
import {BookService} from "../../services/book.service";
import {Book} from "../../models/book";
import {NavbarSearchService} from "../../services/navbar-search.service";
import {mergeMap} from "rxjs";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books?: Book[];
  currentBook: Book = {};
  currentIndex = -1;
  searchValue = '';

  constructor(private bookService: BookService, private searchBar: NavbarSearchService) {
  }

  ngOnInit(): void {
    this.retrieveBooks();
    this.searchBar.currentSearch
      .pipe(
        mergeMap(titleSearched => {
          this.currentBook = {};
          this.currentIndex = -1;
          return this.bookService.findByTitle(titleSearched);
        }),
      )
      .subscribe(bookSearched => this.books = bookSearched)
  }

  private retrieveBooks() {
    this.bookService.getAll()
      .subscribe({
        next: (data) => {
          this.books = data;
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  refreshList(): void {
    this.retrieveBooks();
    this.currentBook = {};
    this.currentIndex = -1;
  }

  setActiveBook(book: Book, index: number): void {
    this.currentBook = book;
    this.currentIndex = index;
  }

  removeAllBooks(): void {
    this.bookService.deleteAll()
      .subscribe({
        next: response => {
          this.refreshList();
        },
        error: err => {
          console.log(err);
        }
      });
  }

  removeBook(id: number) {
    this.bookService.delete(id)
      .subscribe({
        next: response => {
          this.refreshList();
        },
        error: err => {
          console.log(err);
        }
      });
  }
}
