import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HikeListComponent } from './hike-list/hike-list.component';
import { HikeService } from './shared/hike.service';
import { HikeDetailsComponent } from './hike-details/hike-details.component';
import { HikeFilterPipe } from './hike-filter.pipe';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AddHikeComponent } from './add-hike/add-hike.component';
import { NglCoreModule } from 'angular-leaflet';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    HikeListComponent,
    HikeDetailsComponent,
    HikeFilterPipe,
    HomeComponent,
    ContactComponent,
    AddHikeComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule

  ],
  providers: [HikeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
