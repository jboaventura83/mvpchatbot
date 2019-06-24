import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};


  constructor(public authService: AuthService, private alertify: AlertifyService,
     private router: Router) { }

  ngOnInit() {

  }

  login() {
    if (this.model.username === 'prodesp' && this.model.password === 'mvp2019') {
      this.alertify.success('Logado com sucesso');
      localStorage.setItem('token', 'true');
      this.router.navigate(['/home']);
    } else {
      this.alertify.error('Não autorizado! Verifique usuário e senha!');
    }
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.alertify.message('usuário deslogado');
    this.router.navigate(['/home']);
  }

}
