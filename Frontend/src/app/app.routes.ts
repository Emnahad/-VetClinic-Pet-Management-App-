import { Routes } from '@angular/router';
import { PetListComponent } from './pets/pet-list/pet-list.component';
import { PetFormComponent } from './pets/pet-form/pet-form.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { authGuard } from './auth/auth.guard';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'pets', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'pets',
    children: [
      { path: '', component: PetListComponent, canActivate: [authGuard] },
      { path: 'new', component: PetFormComponent, canActivate: [authGuard] },
      { path: 'edit/:id', component: PetFormComponent, canActivate: [authGuard] }
    ]
  },
  { path: '**', redirectTo: 'pets' }
];
