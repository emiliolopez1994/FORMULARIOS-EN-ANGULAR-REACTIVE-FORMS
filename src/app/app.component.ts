import { Component } from '@angular/core';
import { RegistroUsuarioComponent } from './componentes/registro-usuario/registro-usuario.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RegistroUsuarioComponent],
  template: '<app-registro-usuario />'
})
export class AppComponent {}
