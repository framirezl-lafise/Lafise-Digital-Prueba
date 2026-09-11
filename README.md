<div align="center">
  <img src="assets/images/brand/readme-banner.png" alt="LAFISE Digital" width="100%" />

  <h1>LAFISE Digital</h1>

  <p>
    Prototipo de banca digital para la prueba técnica de LAFISE.<br />
    Inicio del cliente, transferencia en córdobas y reserva para el resto de operaciones rápidas.
  </p>

  <p>
    <img src="https://img.shields.io/badge/Expo-SDK%2054-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo SDK 54" />
    <img src="https://img.shields.io/badge/React_Native-0.81-20232a?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React Native" />
    <img src="https://img.shields.io/badge/TypeScript-strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Zustand-estado-433E38?style=for-the-badge" alt="Zustand" />
    <img src="https://img.shields.io/badge/Jest-pruebas-C21325?style=for-the-badge&logo=jest&logoColor=white" alt="Jest" />
  </p>
</div>

<p align="center">
  Corre sobre <b>Expo SDK 54</b>. Se evalúa en un teléfono con Expo Go, o en Chrome como alternativa.
</p>

Este documento sirve para clonar, levantar y entender el proyecto sin reconstruir la arquitectura a partir del código.

## Contenido

- [Cómo ejecutarlo](#cómo-ejecutarlo)
- [Qué incluye el prototipo](#qué-incluye-el-prototipo)
- [Stack](#stack)
- [Cómo se maneja el estado](#cómo-se-maneja-el-estado)
- [Arquitectura de carpetas](#arquitectura-de-carpetas)
- [Pantallas y navegación](#pantallas-y-navegación)
- [Pruebas](#pruebas)
- [Cierre de la prueba y trabajo pendiente](#cierre-de-la-prueba-y-trabajo-pendiente)
- [Verificación rápida](#verificación-rápida)

## Cómo ejecutarlo

Hay dos caminos. El primero es el esperado para la prueba (teléfono físico + Expo Go). El segundo existe solo si el teléfono no carga el bundler.

### Requisitos

| Requisito            | Detalle                                            |
| :------------------- | :------------------------------------------------- |
| Node.js              | 20 LTS o superior (requerido por Expo SDK 54)      |
| Gestor               | npm (incluido con Node)                            |
| Teléfono (opción 1)  | Android con Expo Go **SDK 54**                     |
| Red (opción 1)       | La PC y el teléfono en la **misma red Wi-Fi**      |
| Navegador (opción 2) | Google Chrome, con la extensión indicada más abajo |

Instalación del proyecto:

```bash
git clone <url-del-repositorio>
cd prueba-lafise-digital
npm install
```

<details>
<summary><b>Opción 1 (recomendada): Expo Go SDK 54 en el teléfono</b></summary>

1. En el teléfono, abra [https://expo.dev/go](https://expo.dev/go).
2. Descargue e instale el **APK de Expo Go correspondiente a SDK 54**. No use una versión de Expo Go de otro SDK: el proyecto está fijado a Expo 54 y el cliente tiene que coincidir.
3. Confirme que la PC y el teléfono están en la **misma red**. Si cada uno usa un Wi-Fi distinto, o el teléfono está en datos móviles, el QR no va a cargar el bundler.
4. En la PC, desde la raíz del repo:

   ```bash
   npx expo start
   ```

5. Abra Expo Go en el teléfono y **escanee el código QR** que imprime la terminal.

Resultado esperado: la app arranca en Inicio, con el saludo, la cuenta de ahorro y las operaciones rápidas.

Si el QR no conecta, verifique primero la red compartida y que el APK sea SDK 54. No mezcle esa falla con la opción web: son entornos distintos.

</details>

<details>
<summary><b>Opción 2 (respaldo): localhost en Google Chrome</b></summary>

Use esta vía solo si Expo Go no carga. El simulador del navegador no sustituye el comportamiento nativo (video, haptics, transición de éxito), pero permite recorrer pantallas y layout.

1. Instale **Google Chrome**. Otros navegadores no están soportados para esta vía.
2. Instale en Chrome la extensión **Simulador de teléfono móvil - prueba de sitio responsive**:

   [https://chromewebstore.google.com/detail/ckejmhbmlajgoklhgbapkiccekfoccmk?utm_source=item-share-cb](https://chromewebstore.google.com/detail/ckejmhbmlajgoklhgbapkiccekfoccmk?utm_source=item-share-cb)

3. En la raíz del repo:

   ```bash
   npx expo start
   ```

4. En la terminal de Expo, pulse **`w`** para abrir la app en el navegador (localhost).
5. En Chrome, active la extensión y **seleccione un dispositivo mobile** (por ejemplo un iPhone o un Android de gama media). Revise el flujo en ese viewport, no en escritorio.

La combinación correcta es: Chrome + extensión + tecla `w`. Abrir el puerto en Edge, Firefox o sin el simulador no es el entorno pedido.

</details>

### Comandos útiles

| Comando          | Uso                                    |
| :--------------- | :------------------------------------- |
| `npx expo start` | Bundler. QR para Expo Go; `w` para web |
| `npm test`       | Jest, una sola pasada                  |
| `npm run lint`   | ESLint con la config de Expo           |

## Qué incluye el prototipo

La app no habla con un backend. Los saldos, el usuario y las cuentas viven en constantes. El valor de la prueba está en el flujo, la validación, la navegación y la UI.

| Área                                                 | Comportamiento                                                                       |
| :--------------------------------------------------- | :----------------------------------------------------------------------------------- |
| Inicio                                               | Saludo, cuenta de ahorro (C$ 12,000), pago quincenal y cuatro operaciones rápidas    |
| Transferir dinero                                    | Formulario de cuenta destino y monto, confirmación, animación de éxito y comprobante |
| Pagar servicio, Recargar celular, Retiro sin tarjeta | Navegan a una pantalla de «próximamente» con video en loop                           |
| Operaciones / Productos (tabs)                       | Placeholders. El producto activo y la transferencia salen de Inicio                  |

<details>
<summary><b>Flujo de transferencia</b></summary>

1. Inicio, `Transferir Dinero` (también el icono de envío en la tarjeta de la cuenta).
2. Número de cuenta (hasta 9 dígitos) y monto en córdobas, sin exceder el saldo disponible.
3. Confirmación de origen, destino y total.
4. Transición visual del check verde hacia la pantalla de éxito (se omite si el sistema pide reducir movimiento).
5. Comprobante con fecha y detalle del envío.

La cuenta de origen es `1134948394`. El estado del draft se limpia al volver a entrar a transferir desde Inicio.

</details>

## Stack

| Capa              | Tecnología                         | Versión de referencia    |
| :---------------- | :--------------------------------- | :----------------------- |
| Runtime           | Expo                               | SDK 54 (`expo ~54.0.36`) |
| UI nativa         | React Native                       | 0.81.5                   |
| UI                | React                              | 19.1.0                   |
| Lenguaje          | TypeScript                         | strict                   |
| Navegación        | Expo Router (file-based)           | ~6.0.24                  |
| Estado de negocio | Zustand                            | ^5.0.15                  |
| Imágenes          | expo-image                         | ~3.0.11                  |
| Video             | expo-video                         | ~3.0.16                  |
| Animación         | react-native-reanimated            | ~4.1.1                   |
| Pruebas           | Jest + jest-expo + Testing Library | Jest 29                  |

New Architecture está activa (`newArchEnabled`). Las rutas tipadas y React Compiler están habilitados en `app.json`.

El alias `@/` apunta a la raíz del repo (`tsconfig.json`).

## Cómo se maneja el estado

No hay Redux ni React Query en el runtime. El estado se parte en tres niveles, cada uno con un motivo distinto.

| Nivel                     | Dónde vive                                                                   | Qué guarda                                                              | Ciclo de vida                                                                                                                        |
| :------------------------ | :--------------------------------------------------------------------------- | :---------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| Datos de dominio mock     | `constants/accounts.ts`                                                      | Usuario, cuenta, saldo, origen                                          | Estático. No se muta.                                                                                                                |
| Borrador de transferencia | `store/transfer-store.ts` (Zustand)                                          | Destino, monto, origen, marca de completado                             | En memoria. `saveDraft` valida cuenta y saldo antes de escribir. `reset` al abrir el flujo desde Inicio.                             |
| Transición de éxito       | `features/transfer/success-transition/success-transition-store.ts` (Zustand) | Si la animación corre, ids de corrida, geometría del check y del título | En memoria, acotado al stack de `/transfer`. El overlay vive en `app/transfer/_layout.tsx` para sobrevivir el `router.push` a éxito. |
| Campos del formulario     | `useState` en `TransferFormScreen`                                           | Texto de cuenta y monto mientras se edita                               | Local al screen. Se hidrata desde el draft si el usuario vuelve atrás.                                                               |

Reglas que el store de transferencia no deja pasar: cuenta vacía o no numérica, monto menor o igual a cero, monto mayor al saldo (`SAVINGS_ACCOUNT.balance`). La misma regla se aplica en UI (`utils/transfer.ts`, `utils/account-number.ts`, `utils/currency.ts`).

No hay persistencia en disco. Cerrar la app pierde el draft. Eso es intencional: el prototipo no simula sesión ni historial remoto.

## Arquitectura de carpetas

```text
app/                 Rutas (Expo Router). Orquestan screens, no contienen la UI de negocio.
  (tabs)/            Inicio, Operaciones, Productos
  transfer/          Formulario, confirmación, éxito + overlay de transición
  coming-soon.tsx    Placeholder de funcionalidades no entregadas
features/            Pantallas y lógica por dominio (home, transfer, coming-soon)
store/               Zustand del draft de transferencia
components/          Shell, header, botones, campos, imagen local
constants/           Cuentas mock, paleta, rutas, copy, assets
utils/               Cuenta, moneda, reglas de envío, safe area
types/               Contratos TypeScript del dominio
assets/              Marca, iconos y video de coming-soon
```

Las rutas públicas están centralizadas en `constants/routes.ts` (`appRoutes`). Los screens de `app/` delegan en `features/` (patrón contenedor / presentación).

## Pantallas y navegación

```text
(tabs)
  Inicio                 /
  Operaciones            /operaciones
  Productos              /productos
transfer
  Formulario             /transfer
  Confirmación           /transfer/confirm
  Éxito                  /transfer/success
coming-soon              /coming-soon
```

`coming-soon` reproduce en loop el video `assets/videos/chica-lafise-coming-soon-v2.mp4`. El fondo de esa pantalla es `#F2F5F7` para que el clip encaje sin costura.

## Pruebas

`npm test` corre Jest una vez (sin watch). Cubre validación de cuenta y monto, formato de moneda, el store de transferencia, geometría/timeline de la transición de éxito y el copy de coming-soon.

No hay suite E2E. La verificación del flujo visual se hace en Expo Go o en Chrome con el simulador.

## Cierre de la prueba y trabajo que me hubiese gustado agregar

La entrega funcional la cerre el **sábado 5 de septiembre de 2026**. Lo que está en este repositorio es lo que alcanzó el tiempo de la prueba tomando en cuenta el tiemponde entrega que fue el sabado: flujo de transferencia completo, inicio con operaciones rápidas y pantalla de «próximamente» para el resto.

Lo que me hubiera gustado sumar (Pagar Servicio, Recarga, Retiro, Operaciones, Productos, historial, Supabase, animaciones, dark mode y accesibilidad) está escrito en [PENDIENTES.md](./PENDIENTES.md). No son fallos de lo entregado; son extensiones que el calendario no permitió cerrar.

## Verificación rápida

- [ ] `npm install` termina sin error
- [ ] Opción 1: Expo Go SDK 54 instalado desde [expo.dev/go](https://expo.dev/go), misma red, `npx expo start`, QR abre Inicio
- [ ] Opción 2 (solo si falla la 1): Chrome + extensión + `npx expo start` + `w`, viewport mobile
- [ ] Transferencia válida llega a confirmación y a éxito
- [ ] Monto mayor a C$ 12,000 no deja continuar
- [ ] Pagar servicio / Recargar / Retiro abren coming-soon
- [ ] `npm test` pasa
