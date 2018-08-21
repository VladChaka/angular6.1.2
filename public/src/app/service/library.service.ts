import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { RemoteService } from './remote.service';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

    constructor(protected remoteService: RemoteService) { }

    takeBook(data: string, userId: string, bookId:string, token: string): Observable<any> {
        return this.remoteService.takeBook(data, userId, bookId, token);
    }

    passBook(data: string, userId: string, bookId:string, token: string): Observable<any> {
        return this.remoteService.passBook(data, userId, bookId, token);
    };

    getBooks(token): Observable<any> {
        return this.remoteService.getBooks(token);
    }

    getUserBooks(id: string, token: string): Observable<any> {
        return this.remoteService.getUserBooks(id, token);
    }

    getImageBook(id, path, token): Observable<any> {
        return this.remoteService.getImageBook(id, path, token);
    }
    // getOneBook(data: object, id:string, token: string) {
    //     this.remoteService.getBookById(data, id, token);
    // };
}
