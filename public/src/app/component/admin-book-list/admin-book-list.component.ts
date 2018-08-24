import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../../service/library.service';
import {Users} from "../../model/users";

@Component({
  selector: 'admin-book-list',
  templateUrl: './admin-book-list.component.html'
})
export class AdminBookListComponent implements OnInit {
    token: string = localStorage['token'] || sessionStorage['token'];
    role: boolean = localStorage['role'] || sessionStorage['role'];
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
                },
                err => console.log("err",err)
            );
    }
    // deleteBook():void{
    //     this.libraryService.deleteBoo
    // }
}
