import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevopedidoComponent } from './nuevopedido.component';

describe('NuevopedidoComponent', () => {
  let component: NuevopedidoComponent;
  let fixture: ComponentFixture<NuevopedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevopedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevopedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
