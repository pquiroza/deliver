import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Pedidofinal } from '../pedidofinal';
import { Posicion } from '../posicion';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FontAwesomeModule, FaIconLibrary, FaConfig } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

declare var google: any;


interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

interface Location {
  lat: number;
  lng: number;
  viewport?: Object;
  zoom: number;
  address_level_1?:string;
  address_level_2?: string;
  address_country?: string;
  address_zip?: string;
  address_state?: string;
  marker?: Marker;
}
export interface PedidoId extends Pedidofinal {
  id: string;
}
export interface PosicionId extends Posicion{
  id: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  faSearch = faSearch;
public pedidosCollection: AngularFirestoreCollection<Pedidofinal>;
pedidos: Observable<PedidoId[]>;
public posicionCollecion: AngularFirestoreCollection<Posicion>;
posiciones: Observable<PosicionId[]>;



    constructor(private router: Router,private afs: AngularFirestore,library: FaIconLibrary, faConfig: FaConfig) {
  //  faConfig.defaultPrefix = 'far';

    library.addIcons(faSearch);

    this.pedidosCollection = afs.collection<Pedidofinal>('Pedido',ref => ref.where('estado','==','Ingresado'));
    this.pedidos = this.pedidosCollection.snapshotChanges().pipe(map(actions => actions.map(a => {
const data = a.payload.doc.data();
const id = a.payload.doc.id;
return {id, ...data}

    })))

    this.posicionCollecion = afs.collection<Posicion>('MovilPosicion');
    this.posiciones = this.posicionCollecion.snapshotChanges().pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      return {id, ...data}
    })))

  }


  detallePedido(idPedido){
    this.router.navigate(['/detallepedido'], {queryParams:{idPedido:idPedido}});
  }

  ngOnInit() {
  }


goPedido(){
  this.router.navigate(['/pedido']);

}

}
