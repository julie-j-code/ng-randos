import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HikeListComponent } from './hike-list/hike-list.component';
import { HikeService } from './shared/hike.service';

@NgModule({
  declarations: [
    AppComponent,
    HikeListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule

  ],
  providers: [HikeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
