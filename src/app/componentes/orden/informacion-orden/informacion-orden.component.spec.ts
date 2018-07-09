import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionOrdenComponent } from './informacion-orden.component';

describe('InformacionOrdenComponent', () => {
  let component: InformacionOrdenComponent;
  let fixture: ComponentFixture<InformacionOrdenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacionOrdenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
