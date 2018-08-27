import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../../service/library.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'library-card',
  templateUrl: './library-card.component.html'
})
export class LibraryCardComponent implements OnInit { 
    id: string;
    token: string = localStorage['token'] || sessionStorage['token'];
    userBooks: any = [];
    currentPage: number = 1;
    numberOfPages: number = 1;
    pageSize: number = 18;

    constructor(
        private libraryService: LibraryService,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.getUserBooks();
    }

    getUserBooks(): void {
        this.userService.getMyId(this.token)
        .subscribe(id => {
            this.id = id;
            this.libraryService.getUserBooks(this.id, this.token)
            .subscribe(
                books => {
                    for (let i = 0; i < books.length; i++) {
                        this.libraryService.getOneBook(books[i].bookid, this.token)
                        .subscribe(data => this.userBooks.push(data));
                    }
                },
                err => console.log("err",err)
            );
        })
        
    }

}