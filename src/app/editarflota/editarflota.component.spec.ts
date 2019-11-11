import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarflotaComponent } from './editarflota.component';

describe('EditarflotaComponent', () => {
  let component: EditarflotaComponent;
  let fixture: ComponentFixture<EditarflotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarflotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarflotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
