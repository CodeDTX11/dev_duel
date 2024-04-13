import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import userProfile from './app/models/userProfile';
// import { BehaviorSubject } from 'rxjs';

const inspectUserUrl = 'http://localhost:3000/api/user/';
const duelUsersUrl = 'http://localhost:3000/api/users?';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private selectedUserSource = new BehaviorSubject<userProfile | undefined>(undefined);
  // selectedStand = this.selectedUserSource.asObservable();

  constructor(private http: HttpClient) { }

  async inspectUser(username = 'andrew') {
    let data = await this.http.get(inspectUserUrl + username).toPromise();
    console.log(data);
    return data;
  }

  async duelUsers(user1 = 'fabpot', user2 = 'andrew') {
    let data = await this.http.get(duelUsersUrl + `username=${user1}&username=${user2}`).toPromise();
    console.log(data);
    return data;
  }

}