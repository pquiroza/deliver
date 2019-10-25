import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as firebase from "firebase";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(usuario => {
      console.log(usuario);
      if (usuario){
        this.router.navigate(['/main'])

      }
    })
  }

  validateLogin(email: string,password: string){
    firebase.auth().signInWithEmailAndPassword(email,password).then(user => {
      firebase.auth().onAuthStateChanged(usuario => {
        console.log(usuario);
        this.router.navigate(['/main'])

      })
    }).catch(err=> {
      console.log(err);
    })

    //this.router.navigate(['/main']);
  }




}
