import { Component, OnInit, TemplateRef,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Client } from '../client';
import { Productospedido } from '../productospedido';
import { Pedidofinal } from '../pedidofinal';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { FontAwesomeModule, FaIconLibrary, FaConfig } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-client',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Cancelar Pedido</h4>
    <button type="button" class="close" aria-label="Close button" aria-describedby="modal-title" (click)="activeModal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>Desea cancelar el pido seleccionado?</strong></p>
    <p>El pedido será eliminado de la ruta
    <span class="text-danger">Esto no se puede deshacer, deberá volver a ingresar un nuevo pedido.</span>
    </p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="activeModal.dismiss('cancel click')">Volver</button>
    <button type="button" ngbAutofocus class="btn btn-danger" (click)="activeModal.close('Ok click')">Cancelar Pedido</button>
  </div>
  `
})
export class NgbdModalDetalle {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}




export interface ProductospedidoId extends Productospedido {
    id: string;
}

declare var google: any;








@Component({
  selector: 'app-detallepedido',
  templateUrl: './detallepedido.component.html',
  styleUrls: ['./detallepedido.component.css']
})
export class DetallepedidoComponent implements OnInit {
private idPedido: any;
public clientDoc: AngularFirestoreDocument<Client>;
public pedidoDoc: AngularFirestoreDocument<Pedidofinal>;
public productosCollection: AngularFirestoreCollection<Productospedido>;
pedido: any;
cliente: any;
tostada:any;
productosPedido: Observable<ProductospedidoId[]>;
    faTimes = faTimes;

  constructor(public route: ActivatedRoute, public afs: AngularFirestore, public router: Router, library: FaIconLibrary, private modalService: NgbModal) {

    library.addIcons(faTimes);
    this.route.queryParams.subscribe(params => {
      this.idPedido = params['idPedido'];
      console.log(this.idPedido);
    });


    this.pedidoDoc = this.afs.doc<Pedidofinal>('Pedido/'+this.idPedido);
    this.pedidoDoc.valueChanges().subscribe(pedido => {
      this.pedido = pedido;
      console.log(this.pedido);
      this.tostada = false;

      this.clientDoc= this.afs.doc<Client>('Client/'+this.pedido.idcliente);
      this.clientDoc.valueChanges().subscribe(c => {
        this.cliente = c;
        console.log(this.cliente);


      });




    });

    this.productosCollection = this.afs.collection<Productospedido>('ProductosPedido', ref => ref.where('idpedido','==',this.idPedido));
    this.productosPedido = this.productosCollection.snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Productospedido;
        const id = a.payload.doc.id;
        console.log(data);
        return {id, ...data}
    })));


    this.productosPedido.forEach(p => {
      console.log(p);
    })






  }

  ngOnInit() {
  }


  borrarProducto(idProducto){
    this.tostada = true;






//Pendiente validacion de 1 producto y Toast de confirmacion
setTimeout(() => {
  console.log(idProducto)
  let pedidoCollection: AngularFirestoreCollection<Productospedido>;
  pedidoCollection = this.afs.collection<Productospedido>('ProductosPedido');
  pedidoCollection.doc(idProducto).delete();
this.tostada = false;
}, 1000);

  }


  cancelaPedido(idPedido){
    const modalRef = this.modalService.open(NgbdModalDetalle);
    modalRef.componentInstance.name = "Desea Cancelar el Pedido?";
    modalRef.result.then((result)=> {
      let pedidosCollection: AngularFirestoreCollection<Pedidofinal>;
      pedidosCollection = this.afs.collection<Pedidofinal>('Pedido');
      pedidosCollection.doc(idPedido).update({estado:"Cancelado"});
      this.router.navigate(['/main']);
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });


    /*
    let pedidosCollection: AngularFirestoreCollection<Pedidofinal>;
    pedidosCollection = this.afs.collection<Pedidofinal>('Pedido');
    pedidosCollection.doc(idPedido).update({estado:"Cancelado"});
    //Pendiente validacion de 1 producto y Toast de confirmacion
*/
    console.log(idPedido);
  }


  private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}




}
