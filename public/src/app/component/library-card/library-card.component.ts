import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibraryService } from '../../service/library.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'library-card',
  templateUrl: './library-card.component.html'
})
export class LibraryCardComponent implements OnInit { 
    id: string;
    token: string = localStorage['token'] || sessionStorage['token'];
    userBooks: any;
    showUserProfile: boolean;
    currentPage: number = 1;
    numberOfPages: number = 1;
    pageSize: number = 18;


    constructor(
        private route: ActivatedRoute,
        private libraryService: LibraryService,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.getUserBooks();
    }
  
    // getMyId(): void{
    //     this.userService.getMyId(this.token)
    //     .subscribe(id => {
    //         this.id = id;
    //     })
    // }

    getUserBooks(): void {
        this.userService.getMyId(this.token)
        .subscribe(id => {
            this.id = id;
            this.libraryService.getUserBooks(this.id, this.token)
            .subscribe(
                books => {
                    console.log(this.id);
                    console.log(this.token);
                    console.log(books);
                    
                    this.userBooks = books;
                },
                err => console.log("err",err)
            );
        })
        
    }

}