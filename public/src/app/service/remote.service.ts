import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, defer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RemoteService {

    constructor(private http: HttpClient) { }

    authentication(authInfo: object): Observable<any>{
        return this.http.post('http://localhost:4000/login', authInfo);
    }
    getAll(token: string): Observable<any> {
        return this.checkToken('http://localhost:4000/users', token, null, 'get');
        // return defer(() => {
        //     if (token !== undefined) {
        //         return this.http.get('http://localhost:4000/users', { params: { token: token } });
        //     } else {
        //         console.log('error');
        //     }
        // });
        
    }
    create(data: object, token: string): Observable<any> {
        return this.checkToken('http://localhost:4000/users', token, data, 'post');
        // return defer(() => {
        //     if (token !== undefined) {
        //         return this.http.post('http://localhost:4000/users', data, { params: { token: token } });
        //     } else {
        //         console.log('error');
        //     }
        // });
    }
    delete(id: string, token: string): Observable<any> {
        return this.checkToken(`http://localhost:4000/users/${id}`, token, null, 'delete');
        // return defer(() => {
        //     if (token !== undefined) {
        //         return this.http.delete(`http://localhost:4000/users/${id}`, { params: { token: token } });
        //     } else {
        //         console.log('error');
        //     }
        // });
    }
    getById(id: string, token: string): Observable<any> {
        return this.checkToken(`http://localhost:4000/users/${id}`, token, null, 'get');
        // return defer(() => {
        //     if (token !== undefined) {
        //         return this.http.get(`http://localhost:4000/users/${id}`, { params: { id: id, token: token } });
        //     } else {
        //         console.log('error');
        //     }
        // });
    }
    update(data: object, id: string, token: string): Observable<any> {
        return this.checkToken(`http://localhost:4000/users/${id}`, token, data, 'put');
        // return defer(() => {
        //     if (token !== undefined) {
        //         return this.http.put(`http://localhost:4000/users/${id}`, data, { params: { token: token } });
        //     } else {
        //         console.log('error');
        //     }
        // });
    }
    takeBook(data: object, id: string, token: string): Observable<any> {
        return this.checkToken(`http://localhost:4000/users/${id}/books`, token, data, 'post');
        // return defer(() => {
        //     if (token !== undefined) {
        //         return this.http.post(`http://localhost:4000/users/${id}/books`, data, { params: { token: token } });
        //     } else {
        //         console.log('error');
        //     }
        // });
    }
    passBook(id: string, token: string): Observable<any> {
        return this.checkToken(`http://localhost:4000/users/${id}/books`, token, null, 'delete');
        // return defer(() => {
        //     if (token !== undefined) {
        //         return this.http.delete(`http://localhost:4000/users/${id}/books`, { params: { token: token } });
        //     } else {
        //         console.log('error');
        //     }
        // });
    }
    // getBookById(data: object, id: string, token: string): Observable<any> {
    //     return this.http.get(`http://localhost:4000/users/${id}/books`, { params: { token: token } });
    // }

    checkToken(url: string, token: string, data: object, method: string): Observable<any> {
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
