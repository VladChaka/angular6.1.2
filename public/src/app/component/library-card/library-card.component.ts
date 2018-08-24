import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibraryService } from '../../service/library.service';

@Component({
  selector: 'library-card',
  templateUrl: './library-card.component.html'
})
export class LibraryCardComponent implements OnInit { 

    token: string = localStorage['token'] || sessionStorage['token'];
    userBooks: any;
    showUserProfile: boolean;
    currentPage: number = 1;
    numberOfPages: number = 1;
    pageSize: number = 18;


    constructor(
        private route: ActivatedRoute,
        private libraryService: LibraryService
    ) { }

    ngOnInit() {
        this.getUserBooks();
    }

    getUserBooks(): void {
        this.route.parent.params
        .subscribe(
            params => {
                this.libraryService.getUserBooks(params.id, this.token)
                .subscribe(
                    books => {
                        this.userBooks = books;
                    },
                    err => console.log("err",err)
                );
            }
        );
    }

}