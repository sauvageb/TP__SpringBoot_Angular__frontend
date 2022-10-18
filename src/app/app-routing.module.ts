import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookListComponent} from "./components/book-list/book-list.component";
import {BookDetailsComponent} from "./components/book-details/book-details.component";
import {AddBookComponent} from "./components/add-book/add-book.component";
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {AuthGuardService} from "./helpers/auth-guard.service";

const routes: Routes = [
  {path: '', redirectTo: 'books', pathMatch: 'full'},
  {path: 'books', component: BookListComponent},
  {path: 'books/:id', component: BookDetailsComponent, canActivate: [AuthGuardService]},
  {path: 'add-book', component: AddBookComponent, canActivate: [AuthGuardService]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
