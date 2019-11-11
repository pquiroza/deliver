import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaproductoComponent } from './editaproducto.component';

describe('EditaproductoComponent', () => {
  let component: EditaproductoComponent;
  let fixture: ComponentFixture<EditaproductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditaproductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
