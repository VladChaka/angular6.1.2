import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, defer } from 'rxjs';
import {st} from "@angular/core/src/render3";

@Injectable({
  providedIn: 'root'
})
export class RemoteService {

    constructor(private http: HttpClient) { }

    authentication(data: object): Observable<any>{
        return this.http.post('http://localhost:4000/login', data);
    }
    getAll(token: string): Observable<any> {
        return this.checkToken('http://localhost:4000/users', token, null, 'get'); 
    }
    getById(id: string, token: string): Observable<any> {
        return this.checkToken(`http://localhost:4000/users/${id}`, token, null, 'get');
    }
    getByToken(token: string): Observable<any> {
        return this.checkToken(`http://localhost:4000/token`, token, null, 'get');
    }
    create(data: object, token: string): Observable<any> {
        return this.checkToken('http://localhost:4000/users', token, data, 'post');
    }
    update(data: object, id: string, token: string): Observable<any> {
        return this.checkToken(`http://localhost:4000/users/${id}`, token, data, 'put');
    }
    delete(id: string, token: string): Observable<any> {
        return this.checkToken(`http://localhost:4000/users/${id}`, token, null, 'delete');
    }

    getBooks(token: string): Observable<any> {
        return this.checkToken(`http://localhost:4000/books`, token, null, 'get');
    }
    getOneBook(id: string, token: string): Observable<any> {
        return this.checkToken(`http://localhost:4000/books/${id}`, token, null, 'get');
    }
    addBook(data: object, token: string): Observable<any> {
        return this.checkToken(`http://localhost:4000/books`, token, data, 'post');
    }
    updateBook(id: string, data: object, token: string): Observable<any> {
        return this.checkToken(`http://localhost:4000/books/${id}`, token, data, 'put');
    }
    deleteBook(id: string, token: string): Observable<any> {
        return this.checkToken(`http://localhost:4000/books/${id}`, token, null, 'delete');
    }
    getUserBooks(id: string, token: string): Observable<any> {
        return this.checkToken(`http://localhost:4000/users/${id}/books`, token, null, 'get');
    }
    takeBook(userId: string, bookId:string, token: string): Observable<any> {
        return this.checkToken(`http://localhost:4000/users/${userId}/books/${bookId}`, token, null, 'put');
    }
    passBook(userId: string, bookId:string, token: string): Observable<any> {
        return this.checkToken(`http://localhost:4000/users/${userId}/books/${bookId}`, token, null, 'delete');
    }

    getUserPhoto(id: string, token: string): Observable<any> {
        return this.checkToken(`http://localhost:4000/users/${id}/photo`, token, null, 'get');
    }
    updateUserPhoto(id: string, token: string): Observable<any> {
        return this.checkToken(`http://localhost:4000/users/${id}/photo`, token, null, 'get');
    }
    getBookPhoto(id: string, token: string): Observable<any> {
        return this.checkToken(`http://localhost:4000/books/${id}/photo`, token, null, 'get');
    }
    updateBookPhoto(id: string, token: string): Observable<any> {
        return this.checkToken(`http://localhost:4000/users/${id}/photo`, token, null, 'get');
    }

    checkToken(url: string, token: string, data: any, method: string): Observable<any> {
        return defer(() => {
            let result;

            if (token === undefined || token === null || token === '') {
                result = 'error';
            } else {
                result = this.useHttpRequest(url, token, data, method);
            }
            
            return result;
        });
    }
    
    useHttpRequest(url: string, token: string, data: object, method: string): Observable<any> {
        let result;

        if (method === 'post') {
            result = this.http.post(url, data, { params: { token: token } });
        } else if (method === 'get'){
            result = this.http.get(url, { params: { token: token } });
        } else if (method === 'put') {
            result = this.http.put(url, data, { params: { token: token } });
        } else if (method === 'delete') {
            result = this.http.delete(url, { params: { token: token } });
        }
        
        return result;
    }
}
