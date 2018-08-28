import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../../service/library.service';
import { UserService } from '../../service/user.service';
import { ActivatedRoute } from '@angular/router';

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
        private userService: UserService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.getUserBooks();
    }

    getUserBooks(): void {
        if (this.route.parent.routeConfig.path !='myprofile'){
            this.route.parent.params
                .subscribe(params => {
                    this.libraryService.getUserBooks(params.id, this.token)
                        .subscribe(
                            books => {
                                if (books !== null) {
                                    for (let i = 0; i < books.length; i++) {
                                        this.libraryService.getOneBook(books[i].bookid, this.token)
                                        .subscribe(data => this.userBooks.push(data));
                                    }
                                }
                            }
                        );
                });
        } else{
            this.userService.getMyId(this.token)
                .subscribe(id => {
                    this.libraryService.getUserBooks(id, this.token)
                        .subscribe(
                            books => {
                                if (books !== null) {
                                    for (let i = 0; i < books.length; i++) {
                                        this.libraryService.getOneBook(books[i].bookid, this.token)
                                        .subscribe(data => this.userBooks.push(data));
                                    }
                                }
                            }
                        );
                });
        }
    }
}