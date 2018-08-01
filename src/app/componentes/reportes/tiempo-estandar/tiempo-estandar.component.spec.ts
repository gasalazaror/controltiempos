import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiempoEstandarComponent } from './tiempo-estandar.component';

describe('TiempoEstandarComponent', () => {
  let component: TiempoEstandarComponent;
  let fixture: ComponentFixture<TiempoEstandarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiempoEstandarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiempoEstandarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
