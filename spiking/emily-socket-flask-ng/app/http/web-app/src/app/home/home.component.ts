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
  presentations: Array<any>;

  constructor(
    private apiClient: ApiClientService,
    private router: Router
  ) {
    this.selectedTab = 0;
    this.presentations = [];
   }

  ngOnInit() {
    this.apiClient.getPresentations().then( (presentations) => {
      this.presentations = presentations
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
