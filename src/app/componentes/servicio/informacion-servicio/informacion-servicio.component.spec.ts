import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionServicioComponent } from './informacion-servicio.component';

describe('InformacionServicioComponent', () => {
  let component: InformacionServicioComponent;
  let fixture: ComponentFixture<InformacionServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacionServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
