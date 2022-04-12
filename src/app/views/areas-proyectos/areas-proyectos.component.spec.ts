import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasProyectosComponent } from './areas-proyectos.component';

describe('AreasProyectosComponent', () => {
  let component: AreasProyectosComponent;
  let fixture: ComponentFixture<AreasProyectosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreasProyectosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreasProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
