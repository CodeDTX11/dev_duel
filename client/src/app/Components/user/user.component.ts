import { Component, Input, OnInit } from '@angular/core';
// import { userInfo } from 'src/app/app.component';
import {userProfile} from 'src/app/models/userProfile';
import { userKeys } from 'src/app/models/userProfile';
import { UserService } from 'src/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {

  user : userProfile | undefined = undefined
  
  constructor(private userService : UserService) {
  }

  ngOnInit(): void {
    this.userService.selectedUser.subscribe(selectedUser => this.user = selectedUser)
  }
}