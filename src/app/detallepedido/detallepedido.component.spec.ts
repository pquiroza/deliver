import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallepedidoComponent } from './detallepedido.component';

describe('DetallepedidoComponent', () => {
  let component: DetallepedidoComponent;
  let fixture: ComponentFixture<DetallepedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallepedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallepedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
