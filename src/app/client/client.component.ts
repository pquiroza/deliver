import { Component, OnInit, ElementRef, ViewChild, Input} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Client } from '../client';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';



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



@Component({
  selector: 'app-client',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Deliver</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>{{name}}!</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class NgbdModalContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}




@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  @ViewChild('nombreInput',{static: false}) nombreInput: ElementRef;
  @ViewChild('apellidoInput',{static: false}) apellidoInput: ElementRef;
  @ViewChild('rutInput',{static:false}) rutInput: ElementRef;
  @ViewChild('telefonoInput',{static:false}) telefonoInput: ElementRef;
  @ViewChild('emailInput',{static:false}) emailInput:ElementRef;
  @ViewChild('calleInput',{static:false}) calleInput:ElementRef;
  @ViewChild('numeroInput',{static:false}) numeroInput:ElementRef;
  @ViewChild('extraInput',{static:false}) extraInput:ElementRef;
  @ViewChild('comunaInput',{static:false}) comunaInput:ElementRef;


  geocoder: any;


  clients: Observable<Client[]>;

  constructor(public afs: AngularFirestore,private modalService: NgbModal, private router: Router, public mapsApiLoader: MapsAPILoader) {
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    })

   }

  ngOnInit() {

  }




close(){
  console.log("Cerrando desde el container");
}

guardaClient(){


const nombre = this.nombreInput.nativeElement.value;
const apellido = this.apellidoInput.nativeElement.value;
const rut = this.rutInput.nativeElement.value;
const telefono = this.telefonoInput.nativeElement.value;
const email = this.emailInput.nativeElement.value;
let calle = this.calleInput.nativeElement.value;
const numero = this.numeroInput.nativeElement.value;
let extra = this.extraInput.nativeElement.value;
const comuna = this.comunaInput.nativeElement.value;
let lat = 0;
let lng = 0;
calle = calle.toLowerCase();
extra = extra.toLowerCase();
let extraarray = extra.split(" ");
let callearray = calle.split(" ");
callearray.push(numero);
extraarray.forEach(e => {
  callearray.push(e);
})

console.log(callearray);
if (nombre=="" || apellido=="" || rut=="" || calle=="" || numero=="" || telefono==""){

  const modalRef = this.modalService.open(NgbdModalContent);
      modalRef.componentInstance.name = 'Debe llenar todos los campos para registrar un nuevo cliente';
      modalRef.result.then(() => { console.log("user closes");},() => { console.log('Backdrop click')})



} else{

      const id = this.afs.createId();
      console.log(id);

      //console.log(client);
    //


    this.geocoder = new google.maps.Geocoder()

      this.findcoordinates(calle+" "+numero+" "+comuna, this.geocoder,(results) => {
        if(results){
          console.log(results);
          console.log(results[0].geometry.location.lat());
          console.log(results[0].geometry.location.lng());
          lat = results[0].geometry.location.lat();
          lng = results[0].geometry.location.lng()
          const  clientsCollection: AngularFirestoreCollection<Client> = this.afs.collection<Client>('Client'); ;
        //  clientsCollection =
        const client: Client ={id,nombre,apellido,rut,telefono,calle,numero,extra,comuna,callearray,lat: lat,lng: lng};
           clientsCollection.doc(id).set(client);

        }
        else {
          console.log("fail");
        }
      });

      //console.log(cords);
        const modalRef = this.modalService.open(NgbdModalContent);
            modalRef.componentInstance.name = 'Cliente Guardado de manera correcta';
            modalRef.result.then(() => { this.router.navigate(['/main']);},() => { this.router.navigate(['/main'])})



}










}

 findcoordinates(direccion,geocoder,callback){
console.log(direccion);

  geocoder.geocode({
    'address': direccion
  }, (results, status) => {

    if (status == google.maps.GeocoderStatus.OK){
      console.log(results[0].geometry.location);
      callback(results);

    }
    else{

      console.log("pal pico");
      callback(null);
    }
  }
)




}


goPedido(){
  this.router.navigate(['/pedido']);

}



}
