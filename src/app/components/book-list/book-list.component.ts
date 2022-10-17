import {Component, OnInit} from '@angular/core';
import {BookService} from "../../services/book.service";
import {Book} from "../../models/book";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books?: Book[];
  currentBook: Book = {};
  currentIndex = -1;

  constructor(private bookService: BookService) {
  }

  ngOnInit(): void {
    this.retrieveBooks();
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

  searchTitle(): void {
    this.currentBook = {};
    this.currentIndex = -1;

    // this.bookService.findByTitle(this.title)
    //   .subscribe(
    //     data => {
    //       this.books = data;
    //       console.log(data);
    //     },
    //     error => {
    //       console.log(error);
    //     });
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
