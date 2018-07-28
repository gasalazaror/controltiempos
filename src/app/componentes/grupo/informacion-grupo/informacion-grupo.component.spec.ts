import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionGrupoComponent } from './informacion-grupo.component';

describe('InformacionGrupoComponent', () => {
  let component: InformacionGrupoComponent;
  let fixture: ComponentFixture<InformacionGrupoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacionGrupoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
