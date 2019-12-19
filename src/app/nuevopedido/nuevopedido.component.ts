import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
  import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Client } from '../client';
import { map } from 'rxjs/operators';
import { Product } from '../product';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Carro } from '../carro';
import { Pedido } from '../pedido';
import { Pedidofinal } from '../pedidofinal';
import { Productospedido } from  '../productospedido';
import { Posicion } from '../posicion';
import { MapsAPILoader, AgmMap } from '@agm/core';
declare var google: any;

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
export class NgbdModalPedido {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}

export interface CarroId extends Carro{
  id: string;
}
export interface ProductId extends Product {
    id: string;
}
export interface PosicionId extends Posicion {
  id: string;
}
export interface valores{
  patente: string;
  idvehiculo: string;
  distancia: number;
}


@Component({
  selector: 'app-nuevopedido',
  templateUrl: './nuevopedido.component.html',
  styleUrls: ['./nuevopedido.component.css']
})
export class NuevopedidoComponent implements OnInit {
  @ViewChild('cantidadInput',{static: false}) cantidadInput: ElementRef;
  @ViewChild('productoInput',{static: false}) productoInput: ElementRef;



  private idcliente: any;
  public clientDoc: AngularFirestoreDocument<Client>;
 public productoDoc: AngularFirestoreDocument<Product>;
  //private productsCarro: AngularFirestoreCollection<Carro>;
  private productsCarrofinal: AngularFirestoreCollection<Carro>;
  private carroCollection: AngularFirestoreCollection<Carro>;

  private productsCollection: AngularFirestoreCollection<Product>;
  productsCarro: Observable<CarroId[]>;
  productsCarro2: Observable<Carro[]>;
  products: Observable<ProductId[]>;
  productsCar: Observable<ProductId[]>;
    productsCarfinal: Observable<ProductId[]>;
    productsdelete: Observable<ProductId[]>;
  private pedidoCollection: AngularFirestoreCollection<Pedido>;
  public productos: Array<Carro>;
  client: any;
  subscarro: any;

  public pedidofinalCollection: AngularFirestoreCollection<Pedidofinal>;

  constructor(private afs: AngularFirestore, public route: ActivatedRoute, private modalService: NgbModal,private router: Router,public mapsApiLoader: MapsAPILoader) {
    this.pedidoCollection = afs.collection<Pedido>('Carro');
    this.pedidofinalCollection = afs.collection<Pedidofinal>('Pedido');
    this.carroCollection = afs.collection<Carro>('Carro');
    this.productos = [];
  }

  ngOnInit() {
this.route.queryParams.subscribe(params => {
  this.idcliente = params['idCliente'];
  console.log(this.idcliente);
});
    this.clientDoc = this.afs.doc<Client>('Client/'+this.idcliente);
    this.clientDoc.snapshotChanges().subscribe(datos => {
      this.client = datos.payload.data();
      console.log(this.client);
    })
    //this.client.subscribe(data => console.log(data));

    this.carroCollection = this.afs.collection<Carro>('Carro', ref => ref.where('idusuario','==',this.idcliente).where('estado','==',0));
    this.productsCarro = this.carroCollection.snapshotChanges().pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Carro;
      const id = a.payload.doc.id;
      console.log(a.payload.doc.data());
      return {id, ...data}

    })))


    this.productsCollection = this.afs.collection<Product>('Producto');
    this.products = this.productsCollection.snapshotChanges().pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Product;
      const id = a.payload.doc.id;
      return{id, ...data}
    })))



    console.log(this.products);
  }

guardaProducto(idCliente, nombre,apellido, calle,numero,extra,comuna,lat,lng)  {

  const idProducto = this.productoInput.nativeElement.value;
  const cantidad = this.cantidadInput.nativeElement.value;
  this.productoDoc = this.afs.doc<Product>('Producto/'+idProducto);
  let subs = this.productoDoc.snapshotChanges().subscribe(pro => {
    const prd: Product = pro.payload.data();


    const nombreProducto = prd.nombreProducto;
    const precio = prd.precio;
    const idcarro = this.afs.createId();
    const carro: Carro = {id: idcarro, idusuario: idCliente,nombreCliente: nombre,apellidoCliente: apellido,direccion: calle+" "+numero+" "+extra,comuna:comuna,lat: lat,lng:lng,idproducto: idProducto,nombreproducto: nombreProducto, precio: precio,cantidad: cantidad,fecha:Date.now(),estado:0 }
    this.carroCollection.doc(idcarro).set(carro);
  })



  /*
  console.log("Guarda PRoducto")
  const idProducto = this.productoInput.nativeElement.value;
  const cantidad = this.cantidadInput.nativeElement.value;
  console.log(idProducto);
  console.log(cantidad);
  console.log(idCliente);
const pedido: Pedido = { idCliente,idProducto,fecha:Date.now() }

const id = idCliente;

this.pedidoCollection.doc(id).set(pedido);
this.productsCollection = this.afs.collection<Product>('Carro/'+idCliente+'/Productos');
this.productoDoc = this.afs.doc<Product>('Producto/'+idProducto);
this.productoDoc.snapshotChanges().subscribe(pro => {
  const prd: Product = pro.payload.data();


  const nombreProducto = prd.nombreProducto;
  const precio = prd.precio;

  const nproducto: Product = { id: idProducto, nombreProducto: prd.nombreProducto, precio: prd.precio, stock: cantidad }
  this.productsCollection.add(nproducto);
})




*/
}



async asignaPedido(lat,lng){
  let arreglo: Array<any>;
  return new Promise((resolve, reject) => {
     arreglo=[];
    let posicionCollection: AngularFirestoreCollection<Posicion>;
    let posiciones: any;

    posicionCollection = this.afs.collection<Posicion>('MovilLive');
    posiciones = posicionCollection.snapshotChanges().pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data();


      return data;
    })))

    posiciones.subscribe(p => {
      let distancia = 1000000000;
      let idmovil ="";

      for(const pos of p){

        this.mapsApiLoader.load().then(() => {
            let pt1 = new google.maps.LatLng(
              pos.lat,
              pos.lng
            )
            let pt2 = new google.maps.LatLng(
              lat,
              lng
            )
          let distance = google.maps.geometry.spherical.computeDistanceBetween(pt1,pt2);

            let v: valores = { idvehiculo: pos.idvehiculo, distancia: distance, patente: pos.patente}
            arreglo.push(v);
resolve(arreglo);

        })
      };


    });
  //  resolve(arreglo);
  })







}

finalizaPedido(idc){



  var d = new Date();
  console.log(d.getMonth());
  console.log(d.getFullYear());
  console.log(d.getHours());
  console.log(d.getDate());
 const idpf = this.afs.createId();
  console.log(idc);
  console.log(this.client);
let idvehiculo: "";
let patente: "";
let productosPedidoCollection: AngularFirestoreCollection<Productospedido>;
 this.asignaPedido(this.client.lat,this.client.lng).then((p: Array<any>) =>  {

   p.sort(function(a,b){
     return a.distancia - b.distancia;
   });
   console.log(p);
   idvehiculo = p[0].idvehiculo;
   patente = p[0].patente;
   




   const pcliente: Pedidofinal = {id:idpf,idcliente:idc,nombre:this.client.nombre,apellido:this.client.apellido,calle: this.client.calle,numero: this.client.numero, extra: this.client.extra,comuna: this.client.comuna,callearray:this.client.callearray,estado:"Ingresado",movil:patente,idmovil:idvehiculo,lat:this.client.lat,lng:this.client.lng, total: 0,fecha: Date.now(),year: d.getFullYear(), mes: d.getMonth()+1,dia:d.getDate(),hora:d.getHours()}
   this.pedidofinalCollection.doc(idpf).set(pcliente);

   productosPedidoCollection = this.afs.collection<Productospedido>('ProductosPedido');
   this.productsCarrofinal = this.afs.collection<Carro>('Carro',ref => ref.where('idusuario','==',this.idcliente).where('estado','==',0));


   var p1 = new Promise(
     (resolve,reject) =>{

       console.log("PROMISE ")
     this.productsCarro2 = this.productsCarrofinal.valueChanges();
     this.productsCarro2.subscribe(p => {

       resolve(p);
     })

     }
   );

   let total = 0;
   p1.then((val: Array<Carro>) => {

     val.forEach(data => {
       let idpp = this.afs.createId();
       const pedidoProducto: Productospedido = {id:idpp,idpedido: idpf,idproducto: data.idproducto,nombreproducto: data.nombreproducto,cantidad:data.cantidad,precio:data.precio}
       productosPedidoCollection.add(pedidoProducto);
       total = total + (data.cantidad * data.precio);
       this.pedidoCollection.doc(data.id).update({estado:1});


     });
     const modalRef = this.modalService.open(NgbdModalPedido);
     modalRef.componentInstance.name = "Pedido Ingresado Exitosamente";
     console.log(total);
     this.pedidofinalCollection.doc(idpf).update({total: total})
     modalRef.result.then(() => { this.router.navigate(['/main']);},() => { this.router.navigate(['/main'])})
   })


  })







}






}
