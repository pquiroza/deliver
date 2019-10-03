import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { ClientComponent } from './client/client.component';
import { PedidoComponent } from './pedido/pedido.component';

const routes: Routes = [
  {path: '',component:HomeComponent},
  {path: 'main',component:MainComponent},
  {path: 'client',component:ClientComponent},
  {path: 'pedido',component:PedidoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
