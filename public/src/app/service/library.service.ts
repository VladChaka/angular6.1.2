import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { RemoteService } from './remote.service';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

    constructor(protected remoteService: RemoteService) { }

    takeBook(userId: string, bookId:string, token: string): Observable<any> {
        return this.remoteService.takeBook(userId, bookId, token);
    }

    passBook(userId: string, bookId:string, token: string): Observable<any> {
        return this.remoteService.passBook(userId, bookId, token);
    };

    getBooks(token): Observable<any> {
        return this.remoteService.getBooks(token);
    }

    getUserBooks(id: string, token: string): Observable<any> {
        return this.remoteService.getUserBooks(id, token);
    }

    getImageBook(id, token): Observable<any> {
        return this.remoteService.getBookPhoto(id, token);
    }
    // getOneBook(data: object, id:string, token: string) {
    //     this.remoteService.getBookById(data, id, token);
    // };
}