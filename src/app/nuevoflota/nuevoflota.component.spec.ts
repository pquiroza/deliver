import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoflotaComponent } from './nuevoflota.component';

describe('NuevoflotaComponent', () => {
  let component: NuevoflotaComponent;
  let fixture: ComponentFixture<NuevoflotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoflotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoflotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
