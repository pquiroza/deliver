import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Client } from '../client';



@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  @ViewChild('nombreInput',{static: false}) nombreInput: ElementRef;
  @ViewChild('apellidoInput',{static: false}) apellidoInput: ElementRef;
  @ViewChild('rutInput',{static:false}) rutInput: ElementRef;
  @ViewChild('emailInput',{static:false}) emailInput:ElementRef;
  @ViewChild('calleInput',{static:false}) calleInput:ElementRef;
  @ViewChild('numeroInput',{static:false}) numeroInput:ElementRef;
  @ViewChild('extraInput',{static:false}) extraInput:ElementRef;
  @ViewChild('comunaInput',{static:false}) comunaInput:ElementRef;




  private clientsCollection: AngularFirestoreCollection<Client>;
  clients: Observable<Client[]>;

  constructor(private afs: AngularFirestore) {
    this.clientsCollection = afs.collection<Client>('Client');

   }

  ngOnInit() {
  }


guardaClient(){


const nombre = this.nombreInput.nativeElement.value;
const apellido = this.apellidoInput.nativeElement.value;
const rut = this.rutInput.nativeElement.value;
const email = this.emailInput.nativeElement.value;
const calle = this.calleInput.nativeElement.value;
const numero = this.numeroInput.nativeElement.value;
const extra = this.extraInput.nativeElement.value;
const comuna = this.comunaInput.nativeElement.value;



console.log(this.nombreInput.nativeElement.value);
console.log(this.apellidoInput.nativeElement.value);



  const id = this.afs.createId();
  console.log(id);
  const client: Client ={id,nombre,apellido,calle,numero,extra,comuna};
  console.log(client);
  this.clientsCollection.doc(id).set(client);

}


}
