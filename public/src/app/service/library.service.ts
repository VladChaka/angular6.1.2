import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { RemoteService } from './remote.service';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

    constructor(protected remoteService: RemoteService) { }

    takeBook(data: object, id:string, token: string): Observable<any> {
        return this.remoteService.takeBook(data, id, token);
    }

    passBook(id:string, token: string): Observable<any> {
        return this.remoteService.passBook(id, token);
    };

    // getOneBook(data: object, id:string, token: string) {
    //     this.remoteService.getBookById(data, id, token);
    // };
}
