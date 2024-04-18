import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import {userProfile} from './app/models/userProfile';

const inspectUserUrl = 'http://localhost:3000/api/user/';
const duelUsersUrl = 'http://localhost:3000/api/users?';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private selectedUserSource = new BehaviorSubject<userProfile | undefined>(undefined);
  // private selectedUserSource = new BehaviorSubject<userProfile>({});
  selectedUser = this.selectedUserSource.asObservable();

  constructor(private http: HttpClient) { }

  updateUser(user: userProfile) {
    this.selectedUserSource.next(user)
  }

  async inspectUser(username = 'andrew') {
    let data = this.http.get<userProfile>(inspectUserUrl + username)
    console.log(data);
    return data;
  }

  async duelUsers(user1 = 'fabpot', user2 = 'andrew') {
    let data = await this.http.get(duelUsersUrl + `username=${user1}&username=${user2}`).toPromise();
    console.log(data);
    return data;
  }

}