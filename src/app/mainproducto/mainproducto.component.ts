import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from '../product';
import { FontAwesomeModule, FaIconLibrary, FaConfig } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export interface ProductId extends Product {
  id: string;
}

@Component({
  selector: 'app-mainproducto',
  templateUrl: './mainproducto.component.html',
  styleUrls: ['./mainproducto.component.css']
})



export class MainproductoComponent implements OnInit {
  faSearch = faSearch;
  public productosCollection: AngularFirestoreCollection<Product>;
  productos: Observable<ProductId[]>;
  constructor(private router: Router,private afs: AngularFirestore, library: FaIconLibrary, faConfig: FaConfig) {
    library.addIcons(faSearch);
this.productosCollection = afs.collection<Product>('Producto');
this.productos = this.productosCollection.snapshotChanges().pipe(map(actions => actions.map(a => {
  const data = a.payload.doc.data();
  const id = a.payload.doc.id;
  return {id, ...data}
})))

  }

  ngOnInit() {
  }

nuevoProducto(){
  this.router.navigate(['/nuevoproducto']);
}


  editarProducto(idProducto){
    console.log(idProducto);
    this.router.navigate(['/editaproducto'],{queryParams:{idProducto:idProducto}})
  }

}
