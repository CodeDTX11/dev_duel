import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/user.service';
// import { userInfo } from '../app.component';
import {userProfile} from '../models/userProfile';

@Component({
  selector: 'app-duel',
  templateUrl: './duel.component.html',
  styleUrls: ['./duel.component.css'],
})
export class DuelComponent implements OnInit {
  usernameOne: string = '';
  usernameTwo: string = '';
  
  user1: userProfile = {
    username: '',
    name: '',
    location: '',
    bio: '',
    avatar_url: '',
    titles: [],
    'favorite-language': '',
    'public-repos': 0,
    'total-stars': 0,
    'highest-starred': 0,
    'perfect-repos': 0,
    followers: 0,
    following: 0,
    winner: false
  };
 
  user2: userProfile = {
    username: '',
    name: '',
    location: '',
    bio: '',
    avatar_url: '',
    titles: [],
    'favorite-language': '',
    'public-repos': 0,
    'total-stars': 0,
    'highest-starred': 0,
    'perfect-repos': 0,
    followers: 0,
    following: 0,
    winner: false
  };

  winner: string = '';
  error: any = '';
  found: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  receiveUsernameOne(valueEmitted: string) {
    this.usernameOne = valueEmitted;
  }

  receiveUsernameTwo(valueEmitted: string) {
    this.usernameTwo = valueEmitted;
  }

  
  whoWins(user1: userProfile, user2: userProfile) {
    
    if(user1['total-stars'] > user2['total-stars']){
      this.winner = user1.username;
      user1.winner = true;
    } else if (user1['total-stars'] < user2['total-stars']){
      this.winner = user2.username;
      user2.winner = true;
    } else {
      this.winner = 'tie';
    }
  }

  onSubmit() {
    this.userService.duelUsers(this.usernameOne, this.usernameTwo).then(
      (response: any) => {
        if (response[0] && response[1]) {
          this.user1 = response[0];
          this.user2 = response[1];
          this.whoWins(this.user1, this.user2);
          this.found = true;
          this.error = '';
        }
      },
      (error: any) => {
        console.log(error);
        this.error = 'Something went wrong...';
        this.found = false;
      }
    );
  }

}