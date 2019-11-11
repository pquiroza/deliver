import { Component, OnInit, ElementRef, ViewChild, Input} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


import { Product } from '../product';
@Component({
  selector: 'app-nuevoproducto',
  templateUrl: './nuevoproducto.component.html',
  styleUrls: ['./nuevoproducto.component.css']
})
export class NuevoproductoComponent implements OnInit {
@ViewChild('nombreproducto',{static: false}) nombreproducto: ElementRef;
@ViewChild('detalle', {static:false}) detalle: ElementRef;
@ViewChild('precio',{static:false}) precio: ElementRef;
@ViewChild('stock', {static: false}) stock: ElementRef;


  constructor(public afs: AngularFirestore, private router: Router) {

  }


  guardaProducto(){
    const nombreproducto = this.nombreproducto.nativeElement.value;
    const detalle = this.detalle.nativeElement.value;
    const precio = this.precio.nativeElement.value;
    const stock = this.stock.nativeElement.value;

    const id = this.afs.createId();
    const productosCollection: AngularFirestoreCollection<Product> = this.afs.collection<Product>('Producto');
    const producto: Product = {id,nombreProducto: nombreproducto,detalle,precio,stock};
    productosCollection.doc(id).set(producto);
    this.router.navigate(['/mainproducto']);
  }

  ngOnInit() {
  }

}
