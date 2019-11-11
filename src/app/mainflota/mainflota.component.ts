import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Vehiculo } from '../vehiculo';
import { FontAwesomeModule, FaIconLibrary, FaConfig } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';




export interface VehiculoId extends Vehiculo {
  id: string;
}

@Component({
  selector: 'app-mainflota',
  templateUrl: './mainflota.component.html',
  styleUrls: ['./mainflota.component.css']
})
export class MainflotaComponent implements OnInit {
  faSearch = faSearch;
  public movilCollection: AngularFirestoreCollection<Vehiculo>;
  vehiculos: Observable<VehiculoId[]>;
  constructor(private router: Router,private afs: AngularFirestore,  library: FaIconLibrary, faConfig: FaConfig) {
    library.addIcons(faSearch);
    this.movilCollection = afs.collection<Vehiculo>('Movil',ref => ref.where('estado','==','Activo'));
    this.vehiculos = this.movilCollection.snapshotChanges().pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      return {id, ...data}
    })))

  }

  ngOnInit() {
  }

}
