import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioReportesComponent } from './calendario-reportes.component';

describe('CalendarioReportesComponent', () => {
  let component: CalendarioReportesComponent;
  let fixture: ComponentFixture<CalendarioReportesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarioReportesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
