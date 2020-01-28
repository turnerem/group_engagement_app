import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

// import { OktaAuthModule, OktaCallbackComponent, OktaAuthGuard } from '@okta/okta-angular';

const routes: Routes = [
 { path: '', component: LoginComponent },
 {
   path: 'home',
   component: HomeComponent,
  //  canActivate: [OktaAuthGuard],
 },
//  { path: 'implicit/callback', component: OktaCallbackComponent },
];

@NgModule({
 imports: [
   RouterModule.forRoot(routes),
  //  OktaAuthModule.initAuth({
  //    issuer: {yourOktaDomain},
  //    clientId: {yourClientId},
  //    redirectUri: 'http://localhost:8080/implicit/callback',
  //    scope: 'openid profile email'
  //  })
 ],
 exports: [RouterModule]
})
export class AppRoutingModule { }