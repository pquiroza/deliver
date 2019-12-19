import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Client } from '../client';
import { map } from 'rxjs/operators';
import { Pedidofinal } from '../pedidofinal';
import { FontAwesomeModule, FaIconLibrary, FaConfig } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';



export interface PedidofinalId extends Pedidofinal{
  id: string;
}

@Component({
  selector: 'app-detallecliente',
  templateUrl: './detallecliente.component.html',
  styleUrls: ['./detallecliente.component.css']
})
export class DetalleclienteComponent implements OnInit {
  idcliente: any;
  client: any;
  public clientDoc: AngularFirestoreDocument<Client>;
  public pedidosCollection: AngularFirestoreCollection<Pedidofinal>;
  productos: Observable<PedidofinalId[]>;
  faSearch = faSearch;
  constructor(private afs: AngularFirestore, public route: ActivatedRoute,private router: Router,library: FaIconLibrary, faConfig: FaConfig) {
    this.route.queryParams.subscribe(params => {
      this.idcliente = params['idcliente'];
      console.log(this.idcliente);
library.addIcons(faSearch);
      this.clientDoc = this.afs.doc<Client>('Client/'+this.idcliente);
      this.clientDoc.snapshotChanges().subscribe(datos => {
        this.client = datos.payload.data();
        console.log(this.client);
      })

    });

    this.pedidosCollection = this.afs.collection<Pedidofinal>('Pedido', ref => ref.where('idcliente','==',this.idcliente));
    this.productos = this.pedidosCollection.snapshotChanges().pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      return {id, ...data}
    })))


   }

  ngOnInit() {
  }


  detallePedido(idPedido){
    this.router.navigate(['/detallepedido'],{queryParams:{idPedido:idPedido}})
  }

}
