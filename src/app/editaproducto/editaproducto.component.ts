import { Component, OnInit, TemplateRef,Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';

@Component({
  selector: 'app-editaproducto',
  templateUrl: './editaproducto.component.html',
  styleUrls: ['./editaproducto.component.css']
})
export class EditaproductoComponent implements OnInit {
  @ViewChild('nombreproducto',{static: false}) nombreproducto: ElementRef;
  @ViewChild('detalle', {static:false}) detalle: ElementRef;
  @ViewChild('precio',{static:false}) precio: ElementRef;
  @ViewChild('stock', {static: false}) stock: ElementRef;
  idProducto: any;
  producto: any;
  public productoDoc: AngularFirestoreDocument<Product>;

  constructor(public route: ActivatedRoute, public afs: AngularFirestore, public router: Router) {
    this.route.queryParams.subscribe(params => {
      this.idProducto = params['idProducto'];
      console.log(this.idProducto);
    });
    this.productoDoc = this.afs.doc<Product>('Producto/'+this.idProducto);
    this.productoDoc.valueChanges().subscribe(p => {
      this.producto = p;
    })

  }



  guardaProducto(idProducto){
    console.log(idProducto);
    const nombreproducto = this.nombreproducto.nativeElement.value;
    const detalle = this.detalle.nativeElement.value;
    const precio = this.precio.nativeElement.value;
    const stock = this.stock.nativeElement.value;
    const productosCollection: AngularFirestoreCollection<Product> = this.afs.collection<Product>('Producto');
    //const producto: Product = {id,nombreProducto: nombreproducto,detalle,precio,stock};
    productosCollection.doc(idProducto).update({nombreProducto: nombreproducto,detalle: detalle, precio: precio, stock: stock})
    this.router.navigate(['/mainproducto']);

  }

  ngOnInit() {
  }

}
