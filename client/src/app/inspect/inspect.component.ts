import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/user.service';
import { userInfo } from '../app.component';

@Component({
  selector: 'app-inspect',
  templateUrl: './inspect.component.html',
  styleUrls: ['./inspect.component.css'],
})
export class InspectComponent implements OnInit {
  username: string = '';
  user: userInfo = {
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

  error: any = '';
  found: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  receiveUsername(valueEmitted: string) {
    this.username = valueEmitted;
  }

  onSubmit() {
    this.userService.inspectUser(this.username).then(
      (response: any) => {
        if (response) {
          this.error = '';
          this.found = true;
          this.user = response;
        }
      },
      (error: any) => {
        console.log(error);
        this.error = 'Someting went wrong...';
        this.found = false;
      }
    );
  }
}