import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/user.service'
import {userProfile} from '../models/userProfile';

@Component({
  selector: 'app-inspect',
  templateUrl: './inspect.component.html',
  styleUrls: ['./inspect.component.css'],
})
export class InspectComponent implements OnInit {
  username: string = '';
  // user: userProfile = {
  //   username: '',
  //   name: '',
  //   location: '',
  //   bio: '',
  //   avatar_url: '',
  //   titles: [],
  //   'favorite-language': '',
  //   'public-repos': 0,
  //   'total-stars': 0,
  //   'highest-starred': 0,
  //   'perfect-repos': 0,
  //   followers: 0,
  //   following: 0,
  //   winner: false
  // };

  user : userProfile | undefined = undefined

  error: any = '';
  found: boolean = false;

  constructor(private userService: UserService) {}

  async ngOnInit(): Promise<void> {
  }

  receiveUsername(valueEmitted: string) {
    this.username = valueEmitted;
  }

  async onSubmit() {
    (await this.userService.inspectUser(this.username)).subscribe({
      // (response : userProfile) => this.userService.updateUser(response),
      next: (response : userProfile) => this.userService.updateUser(response),
      error: (error: any) => {
        // this.error = JSON.stringify(error)
        if(error.status === 404){
          this.error = error.statusText
        }
      }
    });
    this.userService.selectedUser.subscribe(selectedUser => {
      if(selectedUser === undefined){
        this.error = 'loading...'
        this.found = false
      } else {
      this.user = selectedUser
      this.found = true
      this.error = ''
      }
  })


    
    // this.userService.inspectUser(this.username).then(
    //   (response:any) => {
    //     if (response) {
    //       this.error = '';
    //       this.found = true;
    //       this.user = response;
    //     }
    //   },
    //   (error: any) => {
    //     console.log(error);
    //     this.error = 'Someting went wrong...';
    //     this.found = false;
    //   }
    // );
  }
}