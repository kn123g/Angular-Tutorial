import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCardComponent } from './card.component';

describe('CardComponent', () => {
  let component: FormCardComponent;
  let fixture: ComponentFixture<FormCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
