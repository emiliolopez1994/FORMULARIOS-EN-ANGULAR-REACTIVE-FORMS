import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of, delay, map } from 'rxjs';

/** Validadores reproducibles incluidos en el material de la práctica. */
export class ValidadoresPersonalizados {
  // Validador síncrono aplicado al FormGroup hijo `passwords`.
  static coincidenContrasenas(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmacion = control.get('confirmPassword')?.value;
    return password === confirmacion ? null : { noCoinciden: true };
  }

  // La práctica exige una consulta simulada con RxJS; NO llama a una API real.
  static validarUsernameUnico(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const ocupados = new Set(['admin', 'root', 'usuario123', 'angular_pro']);
      const username = String(control.value ?? '').trim().toLowerCase();
      if (!username) return of(null);
      return of(username).pipe(
        delay(1500),
        map((value: string) => ocupados.has(value) ? { usernameOcupado: true } : null)
      );
    };
  }
}
