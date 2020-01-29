import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../api-client.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  selectedTab: Number;
  meetings: Array<any>;

  constructor(
    private apiClient: ApiClientService,
    private router: Router
  ) {
    this.selectedTab = 0;
    this.meetings = [];
   }

  ngOnInit() {
    this.apiClient.getMeetings().then( (meetings) => {
      this.meetings = meetings
    })
  }

  logout(event) {
    event.preventDefault();
    this.router.navigate(['/'])
  }

  onPres(event) {
    event.preventDefault();
    console.log('clicked onPres!')
  }

}
