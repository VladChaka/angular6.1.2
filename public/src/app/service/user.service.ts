import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { RemoteService } from './remote.service';



@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private remoteService: RemoteService
    ) { }
    
    delete(id: string, token: string): void{
        this.remoteService.delete(id, token).
        subscribe(result => {
            
        });
    };

    add(user: object, token: string): Observable<any> {
        return this.remoteService.create(user, token);
    };

    edit(user: object, id: string, token: string): Observable<any> {        
        return this.remoteService.update(user, id, token);
    };

    getOne(id: string, token: string): Observable<any> {
        return this.remoteService.getById(id, token);
    };

    getAll(token: string): Observable<any> {
        return this.remoteService.getAll(token);
    }
}
