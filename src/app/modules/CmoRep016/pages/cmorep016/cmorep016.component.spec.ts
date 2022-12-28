import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cmorep016Component } from './cmorep016.component';

describe('Cmorep016Component', () => {
  let component: Cmorep016Component;
  let fixture: ComponentFixture<Cmorep016Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cmorep016Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cmorep016Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
