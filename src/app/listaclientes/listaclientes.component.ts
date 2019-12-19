import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Client } from '../client';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';



export interface ClientId extends Client {
  id: string;
}


@Component({
  selector: 'app-listaclientes',
  templateUrl: './listaclientes.component.html',
  styleUrls: ['./listaclientes.component.css']
})
export class ListaclientesComponent implements OnInit {
  @ViewChild('searchDireccion',{static: false}) searchDireccion: ElementRef;
  private clientsCollectionDir: AngularFirestoreCollection<Client>;
  clientsdir: Observable<ClientId[]>;
  private clientsCollectionNom: AngularFirestoreCollection<Client>;
  clientsnom: Observable<ClientId[]>;
  private clientsCollectionRut: AngularFirestoreCollection<Client>;
  clientsrut: Observable<ClientId[]>;
  constructor(private afs: AngularFirestore, private router: Router) {


   }


   buscarDireccion(){
     const direccion =  this.searchDireccion.nativeElement.value;
     console.log(direccion);

     this.clientsCollectionDir = this.afs.collection<Client>('Client',ref => {
       return ref.where('callearray','array-contains',direccion);
     });


   this.clientsdir = this.clientsCollectionDir.snapshotChanges().pipe(map(actions => actions.map(a => {
     const data = a.payload.doc.data() as Client;
     const id = a.payload.doc.id;
     console.log(a.payload.doc.data());
     return { id, ...data };
   })))


   this.clientsCollectionNom = this.afs.collection<Client>('Client',ref => ref.where('nombrearray','array-contains',direccion));
   this.clientsnom = this.clientsCollectionNom.snapshotChanges().pipe(map(actions => actions.map(a => {
     const data = a.payload.doc.data() as Client;
     const id = a.payload.doc.id;
     return { id, ...data};
   })))

   this.clientsCollectionRut = this.afs.collection<Client>('Client',ref => ref.where('rut','==',direccion));
   this.clientsrut = this.clientsCollectionRut.snapshotChanges().pipe(map(actions => actions.map(a => {
     const data = a.payload.doc.data() as Client;
     const id = a.payload.doc.id;
     return { id, ...data};
   })))



     //console.log(this.clientsCollection);







   }


   detalleCliente(idcliente){
     this.router.navigate(['/detallecliente'],{queryParams:{idcliente:idcliente}});
   }

   nuevoCliente(){
     this.router.navigate(['/client']);
   }

  ngOnInit() {
  }

}
