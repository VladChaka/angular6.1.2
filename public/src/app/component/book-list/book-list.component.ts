import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../../service/library.service';
import {Users} from "../../model/users";

@Component({
  selector: 'book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
    token: string = localStorage['token'] || sessionStorage['token'];
    books: any;
    showUserProfile: boolean;
    currentPage: number = 1;
    numberOfPages: number = 1;
    pageSize: number = 18;

    constructor(private libraryService: LibraryService) { }

  ngOnInit() {
    this.getBooks();
      // this.getImageBook();
  }
  // getImageBook():void{
  //       this.libraryService.getImageBook(this.books.id, this.books.path, this.token)
  // }
    getBooks(): void {
        this.libraryService.getBooks(this.token)
            .subscribe(
                books => {
                    this.books = books;
                    console.log(books);
                    // this.numberOfPages = Math.ceil(books.length / this.pageSize);
                },
                err => console.log("err",err)
            );
    }
}
