import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { ClientComponent } from './client/client.component';
import { PedidoComponent } from './pedido/pedido.component';
import { NgbdModalContent } from './client/client.component';
import * as firebase from 'firebase';
import { NuevopedidoComponent } from './nuevopedido/nuevopedido.component';
import{ NgbdModalPedido } from './nuevopedido/nuevopedido.component';


import { DetallepedidoComponent } from './detallepedido/detallepedido.component';
import { NgbdModalDetalle } from './detallepedido/detallepedido.component';
import { MainproductoComponent } from './mainproducto/mainproducto.component';
import { NuevoproductoComponent } from './nuevoproducto/nuevoproducto.component';
import { EditaproductoComponent } from './editaproducto/editaproducto.component';
import { MainflotaComponent } from './mainflota/mainflota.component';
import { NuevoflotaComponent } from './nuevoflota/nuevoflota.component';
import { EditarflotaComponent } from './editarflota/editarflota.component';

   firebase.initializeApp(environment.firebase);
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent,
    ClientComponent,
    PedidoComponent,
    NgbdModalContent,
    NuevopedidoComponent,
    NgbdModalPedido,
    NgbdModalDetalle  ,
    DetallepedidoComponent,
    MainproductoComponent,
    NuevoproductoComponent,
    EditaproductoComponent,
    MainflotaComponent,
    NuevoflotaComponent,
    EditarflotaComponent,

  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AppRoutingModule,
    NgbModule,
      FontAwesomeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD1ZKWPIHOI5_HuVAKNIjK7J-_6g7EzGvM'
    })
  ],
  providers: [GoogleMapsAPIWrapper],
  bootstrap: [AppComponent],
  entryComponents: [ NgbdModalContent,NgbdModalPedido,NgbdModalDetalle  ]
})
export class AppModule { }
