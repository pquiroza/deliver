import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { ClientComponent } from './client/client.component';
import { PedidoComponent } from './pedido/pedido.component';
import { NuevopedidoComponent } from './nuevopedido/nuevopedido.component';
import { DetallepedidoComponent } from './detallepedido/detallepedido.component';
import { MainproductoComponent } from './mainproducto/mainproducto.component';
import {NuevoproductoComponent } from './nuevoproducto/nuevoproducto.component';
import { EditaproductoComponent } from './editaproducto/editaproducto.component';
import { MainflotaComponent } from './mainflota/mainflota.component';
import { NuevoflotaComponent } from './nuevoflota/nuevoflota.component';
import { EditarflotaComponent } from './editarflota/editarflota.component';
import { ListaclientesComponent } from './listaclientes/listaclientes.component';
import { DetalleclienteComponent } from './detallecliente/detallecliente.component';

const routes: Routes = [
  {path: '',component:HomeComponent},
  {path: 'main',component:MainComponent},
  {path: 'client',component:ClientComponent},
  {path: 'pedido',component:PedidoComponent},
  {path: 'nuevopedido',component:NuevopedidoComponent},
  {path: 'detallepedido',component:DetallepedidoComponent},
  {path: 'mainproducto', component: MainproductoComponent },
  {path: 'nuevoproducto',  component: NuevoproductoComponent},
  {path: 'editaproducto', component: EditaproductoComponent},
  {path: 'mainflota', component: MainflotaComponent },
  {path: 'nuevoflota', component: NuevoflotaComponent},
  {path: 'editarflota', component: EditarflotaComponent},
  {path: 'listaclientes', component:ListaclientesComponent},
  {path: 'detallecliente', component: DetalleclienteComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
