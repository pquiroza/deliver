import { Component, OnInit, ElementRef, ViewChild, Input} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Vehiculo } from '../vehiculo';


@Component({
  selector: 'app-nuevoflota',
  templateUrl: './nuevoflota.component.html',
  styleUrls: ['./nuevoflota.component.css']
})
export class NuevoflotaComponent implements OnInit {
  @ViewChild('patente',{static: false}) patente: ElementRef;
  @ViewChild('marca', {static:false}) marca: ElementRef;
  @ViewChild('modelo',{static:false}) modelo: ElementRef;
  @ViewChild('year', {static: false}) year: ElementRef;
  @ViewChild('conductor', {static: false}) conductor: ElementRef;

  constructor(public afs: AngularFirestore, private router: Router) {



  }

  guardaTransporte(){
    const patente = this.patente.nativeElement.value;
    const marca = this.marca.nativeElement.value;
    const modelo = this.modelo.nativeElement.value;
    const year = this.year.nativeElement.value;
    const conductor = this.year.nativeElement.value;

    const id = this.afs.createId();
    const movilCollection: AngularFirestoreCollection<Vehiculo> = this.afs.collection<Vehiculo>('Movil');
    const movil: Vehiculo = {id,patente,marca,modelo,year,conductor,estado: "Activo"};
    movilCollection.doc(id).set(movil);
    this.router.navigate(['/mainflota']);
  }

  ngOnInit() {
  }

}
