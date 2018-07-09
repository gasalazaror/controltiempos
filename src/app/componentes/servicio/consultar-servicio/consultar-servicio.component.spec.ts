import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarServicioComponent } from './consultar-servicio.component';

describe('ConsultarServicioComponent', () => {
  let component: ConsultarServicioComponent;
  let fixture: ComponentFixture<ConsultarServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
