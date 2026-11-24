import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidadoresPersonalizados } from '../../validators/validadores-personalizados';

interface ReferenciaRegistrada {
  nombreRef: string;
  telefonoRef: string;
}

interface RegistroMostrado {
  nombreCompleto: string;
  username: string;
  correo: string;
  referencias: ReferenciaRegistrada[];
  totalReferencias: number;
  fechaRegistro: string;
  nota: string;
}

@Component({
  selector: 'app-registro-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent {
  registroForm: FormGroup;
  enviado = false;
  datosGuardados: RegistroMostrado | null = null;
  mostrarContrasena = false;
  mostrarConfirmacion = false;

  constructor(private readonly fb: FormBuilder) {
    this.registroForm = this.inicializarFormulario();
  }

  inicializarFormulario(): FormGroup {
    return this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', {
        validators: [Validators.required, Validators.minLength(4)],
        asyncValidators: [ValidadoresPersonalizados.validarUsernameUnico()],
        updateOn: 'blur'
      }],
      correo: ['', [Validators.required, Validators.email]],
      passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]]
      }, { validators: ValidadoresPersonalizados.coincidenContrasenas }),
      referencias: this.fb.array([this.nuevaReferencia()])
    });
  }

  private nuevaReferencia(): FormGroup {
    return this.fb.group({
      nombreRef: ['', Validators.required],
      telefonoRef: ['', [Validators.required, Validators.pattern(/^[0-9]{9,10}$/)]]
    });
  }

  get referenciasArray(): FormArray {
    return this.registroForm.get('referencias') as FormArray;
  }

  get usernameControl(): AbstractControl | null {
    return this.registroForm.get('username');
  }

  get passwordsGroup(): AbstractControl | null {
    return this.registroForm.get('passwords');
  }

  get camposCompletos(): number {
    const paths = ['nombreCompleto', 'username', 'correo', 'passwords.password', 'passwords.confirmPassword'];
    return paths.filter((path) => String(this.registroForm.get(path)?.value ?? '').trim() !== '').length;
  }

  get porcentajeCompletado(): number {
    return Math.round((this.camposCompletos / 5) * 100);
  }

  agregarReferencia(): void {
    this.referenciasArray.push(this.nuevaReferencia());
    this.datosGuardados = null;
  }

  eliminarReferencia(indice: number): void {
    if (this.referenciasArray.length > 1) {
      this.referenciasArray.removeAt(indice);
      this.datosGuardados = null;
    }
  }

  esCampoInvalido(nombreCampo: string): boolean {
    const control = this.registroForm.get(nombreCampo);
    return !!(control && control.invalid && (control.touched || control.dirty || this.enviado));
  }

  referenciaInvalida(indice: number, campo: string): boolean {
    const control = this.referenciasArray.at(indice)?.get(campo);
    return !!(control && control.invalid && (control.touched || control.dirty || this.enviado));
  }

  esPasswordInvalido(): boolean {
    const group = this.passwordsGroup;
    const confirmacion = group?.get('confirmPassword');
    return !!(group?.hasError('noCoinciden') && (confirmacion?.touched || confirmacion?.dirty || this.enviado));
  }

  onSubmit(): void {
    this.enviado = true;
    this.datosGuardados = null;

    if (this.registroForm.invalid || this.registroForm.pending) {
      this.registroForm.markAllAsTouched();
      return;
    }

    const datos = this.registroForm.getRawValue() as {
      nombreCompleto: string;
      username: string;
      correo: string;
      referencias: ReferenciaRegistrada[];
    };

    // La práctica es frontend: no se persisten contraseñas ni se envían a un servidor.
    this.datosGuardados = {
      nombreCompleto: datos.nombreCompleto.trim(),
      username: datos.username.trim(),
      correo: datos.correo.trim(),
      referencias: datos.referencias.map((ref) => ({
        nombreRef: ref.nombreRef.trim(),
        telefonoRef: ref.telefonoRef.trim()
      })),
      totalReferencias: datos.referencias.length,
      fechaRegistro: new Date().toLocaleString('es-EC'),
      nota: 'Demostración local: no se han enviado datos a un servidor.'
    };
  }

  resetearFormulario(): void {
    this.registroForm = this.inicializarFormulario();
    this.enviado = false;
    this.datosGuardados = null;
    this.mostrarContrasena = false;
    this.mostrarConfirmacion = false;
  }
}
