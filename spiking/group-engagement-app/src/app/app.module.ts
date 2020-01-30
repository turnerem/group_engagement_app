import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms'
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PublicComponent } from './public/public.component';
import { OrganiserComponent } from './organiser/organiser.component';
import { AuthService } from './auth.service';
import {DataService} from './data.service';
import { CreateSessionComponent } from './create-session/create-session.component'

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    PublicComponent,
    OrganiserComponent,
    CreateSessionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService,DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

//formmodule = 2 way binding
//httpClientModule = api requests
//added AuthService to providers