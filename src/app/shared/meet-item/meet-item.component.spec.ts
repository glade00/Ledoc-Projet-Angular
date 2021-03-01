import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetItemComponent } from './meet-item.component';

describe('MeetItemComponent', () => {
  let component: MeetItemComponent;
  let fixture: ComponentFixture<MeetItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
