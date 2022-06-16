import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HikeDetailsComponent } from './hike-details/hike-details.component';
import { HikeListComponent } from './hike-list/hike-list.component';

const routes: Routes = [

  { path: 'hikes', component: HikeListComponent },
  { path: 'hike/:id', component: HikeDetailsComponent },
  { path: '', redirectTo: 'hikes', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
