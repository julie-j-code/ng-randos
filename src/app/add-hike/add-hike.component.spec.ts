import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHikeComponent } from './add-hike.component';

describe('AddHikeComponent', () => {
  let component: AddHikeComponent;
  let fixture: ComponentFixture<AddHikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHikeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
