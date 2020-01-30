import { Component, OnInit } from '@angular/core';
import {LoginComponent} from '../login/login.component'

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.css']
})
export class CreateSessionComponent implements OnInit {

  constructor(private loginUser: LoginComponent) { }

  ngOnInit() {
    console.log(this.loginUser.loginUser())
  }

}
