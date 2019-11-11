import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainproductoComponent } from './mainproducto.component';

describe('MainproductoComponent', () => {
  let component: MainproductoComponent;
  let fixture: ComponentFixture<MainproductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainproductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
