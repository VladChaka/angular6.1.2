import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, defer } from 'rxjs';
import {st} from "@angular/core/src/render3";

@Injectable({
  providedIn: 'root'
})
export class RemoteService {

    constructor(private http: HttpClient) { }

    tokenValid(token: string): Observable<any>{
        return this.http.get('http://localhost:4000/token', { params: { token: token } });
        // return this.checkToken('http://localhost:4000/token', token, null, 'get');
    }
    authentication(authInfo: object): Observable<any>{
        return this.http.post('http://localhost:4000/login', authInfo);
    }
    getAll(token: string): Observable<any> {
        return this.checkToken('http://localhost:4000/users', token, null, 'get'); 
    }
    create(data: object, token: string): Observable<any> {
        return this.checkToken('http://localhost:4000/users', token, data, 'post');
    }
    delete(id: string, token: string): Observable<any> {
        return this.checkToken(`http://localhost:4000/users/${id}`, token, null, 'delete');
    }
    getById(id: string, token: string): Observable<any> {
        return this.checkToken(`http://localhost:4000/users/${id}`, token, null, 'get');
    }
    update(data: object, id: string, token: string): Observable<any> {
        return this.checkToken(`http://localhost:4000/users/${id}`, token, data, 'put');
    }
    addBook(data: object, token: string): Observable<any> {
        return this.checkToken(`http://localhost:4000/books`, token, data, 'post');
    }
    getBooks(token: string): Observable<any> {
        return this.checkToken(`http://localhost:4000/books`, token, null, 'get');
    }
    getImageBook(id: string, path:string, token: string): Observable<any> {
        return this.checkToken(`http://localhost:4000/books/${id}/photo`, token, path, 'post');
    }
    getOneBook(id: string, token: string): Observable<any> {
        return this.checkToken(`http://localhost:4000/books/${id}`, token, null, 'get');
    }
    updateBook(id: string, data: object, token: string): Observable<any> {
        return this.checkToken(`http://localhost:4000/books/${id}`, token, data, 'put');
    }
    getBooksUser(token: string): Observable<any> {
        return this.checkToken(`http://localhost:4000/users/:id/books`, token, null, 'get');
    }
    takeBook(data: string, userId: string, bookId:string, token: string): Observable<any> {
        return this.checkToken(`http://localhost:4000/users/${userId}/books/${bookId}`, token, data, 'post');
    }
    passBook( data: string, userId: string, bookId:string, token: string): Observable<any> {
        return this.checkToken(`http://localhost:4000/users/${userId}/books/${bookId}`, token, data, 'put');
    }

    checkToken(url: string, token: string, data: any, method: string): Observable<any> {
        return defer(() => {
            let result;

            if (token === undefined) {
                result = 'error';
            } else {
                result =  this.useHttpRequest(url, token, data, method);
            }
            
            return result;
        });
    }
    
    useHttpRequest(url: string, token: string, data: object, method: string): Observable<any> {
        let result;

        if (method === 'post') {
            result =  this.http.post(url, data, { params: { token: token } });
        } else if (method === 'get'){
            result = this.http.get(url, { params: { token: token } });
        } else if (method === 'put') {
            result = this.http.put(url, { params: { token: token } });
        } else if (method === 'delete') {
            result = this.http.delete(url, { params: { token: token } });
        }
        
        return result;
    }
}
