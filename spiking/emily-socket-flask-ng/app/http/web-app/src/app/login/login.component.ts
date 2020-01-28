import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

// all of ngOnInit and login must be changed if using authentication
  ngOnInit() {
  }


  login(event) {
    event.preventDefault();
    // this.router.navigate(['/home'], {replaceUrl: true})
    this.router.navigate(['/home'])
  }

}
