import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapHikesMarkerComponent } from './map-hikes-marker.component';

describe('MapHikesMarkerComponent', () => {
  let component: MapHikesMarkerComponent;
  let fixture: ComponentFixture<MapHikesMarkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapHikesMarkerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapHikesMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
