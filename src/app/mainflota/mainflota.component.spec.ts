import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainflotaComponent } from './mainflota.component';

describe('MainflotaComponent', () => {
  let component: MainflotaComponent;
  let fixture: ComponentFixture<MainflotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainflotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainflotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
