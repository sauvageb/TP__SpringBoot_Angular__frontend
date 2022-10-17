import {Component, OnInit} from '@angular/core';
import {Book} from "../../models/book";
import {BookService} from "../../services/book.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  book: Book = {
    title: '',
    description: '',
    pictureUrl: '',
    isbn: '',
    nbPages: 0,
    weight: 0,
    publishingDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd') as string,
    published: false
  };
  submitted = false;

  constructor(private bookService: BookService, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
  }

  saveTutorial(): void {
    const data = {...this.book};

    this.bookService.create(data)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.submitted = true;
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  newBook(): void {
    this.submitted = false;
    this.book = {
      title: '',
      description: '',
      published: false
    };
  }

}
