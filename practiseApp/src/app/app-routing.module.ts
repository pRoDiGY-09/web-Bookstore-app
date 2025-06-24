import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LibraryComponent } from './components/library/library.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guard/guard';
import { BookDetailComponent } from './components/book-detail/book-detail.component';

const routes: Routes = [
  {path: '',component:HomeComponent},
  {path: 'lib',component:LibraryComponent},
  {path: 'cart',component:CartPageComponent},
  {path: 'login',component:LoginComponent},
  {path: 'register',component:RegisterComponent},
  {path: 'profile',component:ProfileComponent, canActivate:[AuthGuard]},
  {path: 'bookDetail/:id', component:BookDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
