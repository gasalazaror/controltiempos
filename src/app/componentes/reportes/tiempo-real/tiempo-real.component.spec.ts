import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiempoRealComponent } from './tiempo-real.component';

describe('TiempoRealComponent', () => {
  let component: TiempoRealComponent;
  let fixture: ComponentFixture<TiempoRealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiempoRealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiempoRealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
