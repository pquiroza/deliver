import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Vehiculo } from '../vehiculo';
import { Carga } from '../carga';
import { Product } from '../product';
import { Pedidofinal } from '../pedidofinal';
import { FontAwesomeModule, FaIconLibrary, FaConfig } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';




export interface CargaId extends Carga{
  id: string;
}

export interface ProductId extends Product{
  id: string;
}

export interface PedidofinalId extends Pedidofinal {
  id: string;
}
@Component({
  selector: 'app-editarflota',
  templateUrl: './editarflota.component.html',
  styleUrls: ['./editarflota.component.css']
})
export class EditarflotaComponent implements OnInit {
  @ViewChild('cantidadInput',{static: false}) cantidadInput: ElementRef;
  @ViewChild('productoInput',{static: false}) productoInput: ElementRef;
  idVehiculo: any;
faTimes = faTimes;
tostada:any;

  public vehiculoDoc: AngularFirestoreDocument<Vehiculo>;
  public cargaCollection: AngularFirestoreCollection<Carga>;
  public carga: Observable<CargaId[]>;
  public productoDoc: AngularFirestoreDocument<Product>;
  public productosCollection: AngularFirestoreCollection<Product>;
  productos: Observable<ProductId[]>;
  public pedidosCollection: AngularFirestoreCollection<Pedidofinal>;
  pedidos: Observable<PedidofinalId[]>;

  vehiculo: any;
  constructor(public route: ActivatedRoute, public afs: AngularFirestore, library: FaIconLibrary) {
    library.addIcons(faTimes);
    this.tostada = false;
    this.route.queryParams.subscribe(params => {
      this.idVehiculo = params['idVehiculo'];
      console.log(this.idVehiculo);
      this.vehiculoDoc = this.afs.doc<Vehiculo>('Movil/'+this.idVehiculo);
      this.vehiculoDoc.valueChanges().subscribe(v => {
        this.vehiculo = v;
        console.log(this.vehiculo);
    this.pedidosCollection = this.afs.collection<Pedidofinal>('Pedido', ref => ref.where('estado','==','Ingresado').where('movil','==',this.vehiculo.patente));
    this.pedidos = this.pedidosCollection.snapshotChanges().pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      return {id, ...data}
    })))
      });
      this.cargaCollection = this.afs.collection<Carga>('MovilCarga', ref => ref.where('idvehiculo','==',this.idVehiculo));
      this.carga = this.cargaCollection.snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data}
      })));


    });

    this.productosCollection = this.afs.collection<Product>('Producto');
    this.productos = this.productosCollection.snapshotChanges().pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      return {id, ...data}
    })));




   }


borrarProducto(idCarga){
  this.tostada = true;

  setTimeout(() => {
    console.log(idCarga);
    let cargaCollection: AngularFirestoreCollection<Carga>;
    cargaCollection = this.afs.collection<Carga>('MovilCarga');
    cargaCollection.doc(idCarga).delete();
    this.tostada = false;
  },1000);

}

   asignarProducto(idVehiculo){
     console.log(idVehiculo);
     let crg: any;
     const idProducto = this.productoInput.nativeElement.value;
     const cantidad = this.cantidadInput.nativeElement.value;
this.productoDoc = this.afs.doc<Product>('Producto/'+idProducto);
     var p1 = new Promise((resolve,reject) => {
        this.productoDoc.valueChanges().subscribe(pro => {
         resolve(pro);
       })
     });

     p1.then((p: Product) => {
       const prd: Product =  p;


       const nombreProducto = prd.nombreProducto;
        const stock = prd.stock;
        var p2 = new Promise((resolve,reject) => {
          this.cargaCollection = this.afs.collection<Carga>('MovilCarga', ref => ref.where('idvehiculo','==',idVehiculo).where('idproducto','==',idProducto));
          console.log("MEDIO")
           crg = this.cargaCollection.valueChanges();
          crg.subscribe(res => {


            if (res.length>0){
              console.log("resolve")
              resolve(res)
            }
            else{
              console.log("reject")
              reject(res);
            }

          })
        });

        p2.then(r => {
            console.log(r[0].id);
            this.cargaCollection.doc(r[0].id).update({cantidad: Number(r[0].cantidad) + Number(cantidad)})
              this.productosCollection.doc(idProducto).update({stock: stock-cantidad});

        }).catch(e => {
          console.log("CREAR")
          const idcarga = this.afs.createId();

          const carga: Carga = {id: idcarga, idvehiculo: idVehiculo, idproducto: idProducto,cantidad:cantidad,nombreproducto: nombreProducto }
          this.cargaCollection.doc(idcarga).set(carga);
          this.productosCollection.doc(idProducto).update({stock: stock-cantidad});

        })



/*
       const idcarga = this.afs.createId();

       const carga: Carga = {id: idcarga, idvehiculo: idVehiculo, idproducto: idProducto,cantidad:cantidad,nombreproducto: nombreProducto }
       this.cargaCollection.doc(idcarga).set(carga);
       this.productosCollection.doc(idProducto).update({stock: stock-cantidad});
       */
     });





   }

  ngOnInit() {
  }

}
