import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddHikeComponent } from './add-hike/add-hike.component';
import { ContactComponent } from './contact/contact.component';
import { HikeDetailsComponent } from './hike-details/hike-details.component';
import { HikeListComponent } from './hike-list/hike-list.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [

  { path: 'hike/:id', component: HikeDetailsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'hikes', component: HikeListComponent },
  { path: 'create', component: AddHikeComponent },
  { path: 'create/:id', component: AddHikeComponent },
  { path: 'contact', component: ContactComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
