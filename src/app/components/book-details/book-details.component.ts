import {Component, OnInit} from '@angular/core';
import {Book} from "../../models/book";
import {BookService} from "../../services/book.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  errorStatus = false;
  successStatus = false;

  currentBook: Book = {
    title: '',
    description: '',
    pictureUrl: '',
    isbn: '',
    nbPages: 0,
    weight: 0,
    publishingDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd') as string,
    published: false
  };


  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getBook(this.route.snapshot.params['id']);
  }

  getBook(id: string): void {
    this.bookService.get(id)
      .subscribe(
        {
          next: data => {
            this.currentBook = data;
          },
          error: err => console.log(err)
        });
  }

  updateBook(): void {
    this.bookService.update(this.currentBook.id, this.currentBook)
      .subscribe({
        next: (response) => {
          this.displayMessage(true)
        },
        error: (error) => {
          console.log(error);
          this.displayMessage(false)
        }
      });
  }

  displayMessage(isOk: boolean) {
    this.successStatus = isOk;
    this.errorStatus = !isOk;
    setTimeout(() => {
      this.successStatus = false;
      this.errorStatus = false;
    }, 5000);
  }

}
