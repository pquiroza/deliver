import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Client } from '../client';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface ClientId extends Client {
    id: string;
}

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
  @ViewChild('searchDireccion',{static: false}) searchDireccion: ElementRef;
  private clientsCollection: AngularFirestoreCollection<Client>;
  clients: Observable<ClientId[]>;
  private clientsCollection2: AngularFirestoreCollection<Client>;
  clients2: Observable<ClientId[]>;
  constructor(private afs: AngularFirestore, private router: Router) {
//    this.clientsCollection = afs.collection<Client>('Client');

   }

  ngOnInit() {
  }
buscarDireccion(){
  const direccion =  this.searchDireccion.nativeElement.value;
  console.log(direccion);

  this.clientsCollection = this.afs.collection<Client>('Client',ref => {
    return ref.where('callearray','array-contains',direccion);
  });


this.clients = this.clientsCollection.snapshotChanges().pipe(map(actions => actions.map(a => {
  const data = a.payload.doc.data() as Client;
  const id = a.payload.doc.id;
  console.log(a.payload.doc.data());
  return { id, ...data };
})));


this.clientsCollection2 = this.afs.collection<Client>('Client', ref => {
  return ref.where('nombrearray','array-contains',direccion);
});

this.clients2 = this.clientsCollection2.snapshotChanges().pipe(map(actions => actions.map(a => {
  const data = a.payload.doc.data() as Client;
  const id = a.payload.doc.id;
  console.log(a.payload.doc.data());
  return { id, ...data };
})));



  //console.log(this.clientsCollection);


  this.clients.forEach(function(hu){
    console.log(hu)

} )





}


ingresarPedido(idc){
  this.router.navigate(['/nuevopedido'],{queryParams:{idCliente:idc}});

}
}
