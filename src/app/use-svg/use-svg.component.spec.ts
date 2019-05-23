import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseSvgComponent } from './use-svg.component';

describe('UseSvgComponent', () => {
  let component: UseSvgComponent;
  let fixture: ComponentFixture<UseSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseSvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
