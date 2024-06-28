import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormularioPersonasComponent } from './formulario-personas/formulario-personas.component';
import { ListaPersonasComponent } from './lista-personas/lista-personas.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormularioPersonasComponent, ListaPersonasComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AHD1';
  users: any[] = [];

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      const savedUsers = localStorage.getItem('users');
      this.users = savedUsers ? JSON.parse(savedUsers) : [];
    }
  }

  usuarioAgregado(user: any) {
    this.users.push(user);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }
}
