import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorioComponent } from './serinfo002mw.component';

describe('DirectorioComponent', () => {
  let component: DirectorioComponent;
  let fixture: ComponentFixture<DirectorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectorioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
