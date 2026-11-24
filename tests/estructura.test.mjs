import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const required = [
  'package.json','angular.json','src/main.ts','src/app/app.component.ts',
  'src/app/validators/validadores-personalizados.ts',
  'src/app/componentes/registro-usuario/registro-usuario.component.ts',
  'src/app/componentes/registro-usuario/registro-usuario.component.html',
  'src/app/componentes/registro-usuario/registro-usuario.component.css'
];
for (const file of required) {
  assert.ok(existsSync(new URL(`../${file}`, import.meta.url)), `Falta ${file}`);
}
const ts = read('src/app/componentes/registro-usuario/registro-usuario.component.ts');
const validators = read('src/app/validators/validadores-personalizados.ts');
const html = read('src/app/componentes/registro-usuario/registro-usuario.component.html');
for (const method of ['FormArray','FormBuilder','Validators.email','Validators.pattern','markAllAsTouched','resetearFormulario','agregarReferencia','eliminarReferencia']) {
  assert.ok(ts.includes(method), `No se encontró ${method}`);
}
for (const pattern of ['AsyncValidatorFn', 'coincidenContrasenas', 'validarUsernameUnico', 'delay(1500)', 'usernameOcupado']) {
  assert.ok(validators.includes(pattern), `No se encontró ${pattern}`);
}
assert.ok(html.includes('[formGroup]="registroForm"'));
assert.ok(html.includes('formArrayName="referencias"'));
assert.ok(html.includes('*ngFor='));
assert.ok(html.includes('*ngIf='));
const pkg = JSON.parse(read('package.json'));
assert.ok(pkg.dependencies['@angular/forms']);
const tsconfig = JSON.parse(read('tsconfig.json'));
assert.equal(tsconfig.compilerOptions.moduleResolution, 'bundler', 'Angular 20 requiere resolucion bundler');
assert.equal(tsconfig.compilerOptions.paths['rxjs'][0], './node_modules/rxjs/dist/types/index.d.ts');
assert.equal(tsconfig.compilerOptions.paths['rxjs/operators'][0], './node_modules/rxjs/dist/types/operators/index.d.ts');
assert.ok(validators.includes("from 'rxjs';"), 'Import RxJS faltante');
assert.ok(!validators.includes("from 'rxjs/operators';"), 'Operadores deben importarse de rxjs');
console.log('VERIFICACION ESTRUCTURAL COMPLETADA: archivos, formularios y validadores presentes.');
