import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetFormComponent } from './meet-form.component';

describe('MeetFormComponent', () => {
  let component: MeetFormComponent;
  let fixture: ComponentFixture<MeetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
