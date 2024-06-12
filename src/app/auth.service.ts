import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from './interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL = 'http://localhost:3000';
  constructor(private http: HttpClient ,@Inject(PLATFORM_ID) private platformID:object) {}
  register(user: User) {
    return this.http.post(`${this.baseURL}/register`, user);
  }
  login(loginData: User): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/login`, loginData).pipe(
     tap(Response =>{
       if(isPlatformBrowser(this.platformID)) {
        console.log("Token", Response);
                
         localStorage.setItem('authToken', Response.accessToken);
       }else{
         alert("bạn cần đăng nhập để vào trang quản trị");
       }
       
     }))
     // return this.http.post(`${this.baseURL}/login`, user);
   }
   logout(): void {
     if(isPlatformBrowser(this.platformID)){
     localStorage.removeItem('authToken');
     window.location.href = '/login';
     }
   }
 
   isLoggedIn(): any { 
     if(isPlatformBrowser(this.platformID)){
     return !!localStorage.getItem('authToken');
     }
   }
 
   
   checkAdminAccess(): void {
     if(isPlatformBrowser(this.platformID)){
     const tokenn =  localStorage.getItem('authToken');
     if (!tokenn) {
       window.location.href = '/login';
       alert("bạn cần đăng nhập để vào trang quản trị");
     }
   }
 }
 }