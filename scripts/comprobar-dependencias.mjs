import { existsSync } from 'node:fs';
import { join } from 'node:path';

const deps = [
  ['Angular Core', 'node_modules/@angular/core/package.json'],
  ['Angular Build', 'node_modules/@angular/build/package.json'],
  ['RxJS', 'node_modules/rxjs/package.json'],
  ['RxJS tipos principales', 'node_modules/rxjs/dist/types/index.d.ts'],
  ['RxJS tipos de operadores', 'node_modules/rxjs/dist/types/operators/index.d.ts']
];
const faltantes = deps.filter(([, ruta]) => !existsSync(join(process.cwd(), ruta)));
if (faltantes.length) {
  console.error('\nERROR: Falta una dependencia o su definición de tipos.');
  for (const [nombre, ruta] of faltantes) console.error(` - ${nombre}: ${ruta}`);
  console.error('\nCorrige desde la carpeta del proyecto (junto a package.json):');
  console.error('  npm install');
  console.error('  npm install rxjs@7.8.2 --save-exact');
  console.error('  npm run doctor\n');
  process.exitCode = 1;
} else {
  console.log('Dependencias y declaraciones RxJS verificadas correctamente.');
}
