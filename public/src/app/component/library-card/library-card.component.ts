import { Component, OnInit } from '@angular/core';
import { FormService } from '../../service/form.service';
import { ActivatedRoute } from '@angular/router';
import { LibraryService } from '../../service/library.service';

@Component({
  selector: 'library-card',
  templateUrl: './library-card.component.html',
  styleUrls: ['./library-card.component.less']
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
        protected formService: FormService,
        protected libraryService: LibraryService
    ) { }

    closeLibraryCard = function(){
        this.formService.showLibraryCard = false;
    };

    ngOnInit() {
        this.getUserBooks()
    }

    getUserBooks(): void {
        this.route.parent.params
        .subscribe(
            params => {
                this.libraryService.getUserBooks('5b7bde9a9aec5521c7d0a32d', this.token)//params.id
                .subscribe(
                    books => {
                        this.userBooks = books;
                        console.log(this.userBooks);
                    },
                    err => console.log("err",err)
                );
            }
        );
    }

}