import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlbusquedafacturaComponent } from './mdlbusquedafactura.component';

describe('MdlbusquedafacturaComponent', () => {
  let component: MdlbusquedafacturaComponent;
  let fixture: ComponentFixture<MdlbusquedafacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlbusquedafacturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlbusquedafacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
