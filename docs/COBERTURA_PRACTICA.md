# Correspondencia con CLASE 7 PRÁCTICA

| Requisito del documento | Implementación |
| --- | --- |
| Proyecto independiente de Angular | Configuración Angular CLI 20 en `angular.json` |
| FormBuilder y FormGroup | `RegistroUsuarioComponent.inicializarFormulario()` |
| `Validators.required`, `email`, `minLength`, `pattern` | `registro-usuario.component.ts` |
| Contraseñas coincidentes, validador síncrono | `ValidadoresPersonalizados.coincidenContrasenas()` |
| Username único, validador asíncrono con RxJS | `ValidadoresPersonalizados.validarUsernameUnico()` con `of`, `delay`, `map` |
| Verificación `updateOn: 'blur'` | Control `username` |
| FormArray dinámico | `agregarReferencia()`, `eliminarReferencia()` |
| Estados `touched`, `dirty`, `invalid`, `pending` | Template y estilos del componente |
| `markAllAsTouched()` | `onSubmit()` |
| Reiniciar formulario | `resetearFormulario()` |
| Datos mostrados tras envío válido | `datosGuardados`, con JSON sin contraseñas |
| Ejecutar en localhost:4200 | `npm start` |

## Limitaciones deliberadas

- El documento original llama a la validación de username "API" pero realmente usa una lista local con `of(...).pipe(delay(1500))`. La implementación mantiene esa simulación e informa claramente de ello.
- La presentación del JSON omite contraseñas para no exponer credenciales. No se hacen operaciones de base de datos.
