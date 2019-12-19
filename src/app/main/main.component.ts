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
import { Vehiculo } from '../vehiculo';
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
export interface VehiculoId extends Vehiculo{
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
public vehiculosCollection: AngularFirestoreCollection<Vehiculo>;
vehiculos: Observable<VehiculoId[]>;
geocoder: any;
latlng: any;

    constructor(private router: Router,private afs: AngularFirestore,library: FaIconLibrary, faConfig: FaConfig, public mapsApiLoader: MapsAPILoader) {
  //  faConfig.defaultPrefix = 'far';

  this.mapsApiLoader.load().then(() => {

    const pt1 = new google.maps.LatLng(
      -33.407902,
      -71.127879
    )
    const pt2 = new google.maps.LatLng(
      -33.454489599999995,
      -70.6330624
    )

    let distance = google.maps.geometry.spherical.computeDistanceBetween(pt1, pt2);
    console.log(distance);




  })





//  let distance = new google.maps.geometry.spherical.computeDistanceBetween(pt1,pt2);
//  console.log(distance);

    library.addIcons(faSearch);

    this.pedidosCollection = afs.collection<Pedidofinal>('Pedido',ref => ref.where('estado','==','Ingresado'));
    this.pedidos = this.pedidosCollection.snapshotChanges().pipe(map(actions => actions.map(a => {
const data = a.payload.doc.data();
const id = a.payload.doc.id;
console.log(data.lat);
console.log(data.lng);
return {id, ...data}

    })))

    this.vehiculosCollection = this.afs.collection<Vehiculo>('Movil',ref => ref.where('estado','==','Activo'));

    var p1 = new Promise((resolve, reject) => {
        this.vehiculos = this.vehiculosCollection.valueChanges();
        this.vehiculos.subscribe(v => {
          resolve(v);
        })
    });

    p1.then((val: Array<Vehiculo>) => {
      val.forEach(data => {
        console.log(data);
      })
    })







    this.posicionCollecion = afs.collection<Posicion>('MovilLive', ref => ref.where('estado','==','Activo'));
    this.posiciones = this.posicionCollecion.snapshotChanges().pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      console.log(data.lat,data.lng);

      return {id, ...data}
    })))





  }


  detallePedido(idPedido){
    this.router.navigate(['/detallepedido'], {queryParams:{idPedido:idPedido}});
  }


detalleVehiculo(idvehiculo){
  this.router.navigate(['/editarflota'],{queryParams:{idVehiculo:idvehiculo}})
}


  ngOnInit() {
  }


goPedido(){
  this.router.navigate(['/pedido']);

}

}
