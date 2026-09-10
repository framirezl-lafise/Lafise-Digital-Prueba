# Entrega y trabajo que quedó pendiente

La prueba técnica se **La entregue el sábado 5 de septiembre de 2026**. Ese día el prototipo ya cubría el flujo pedido: inicio, transferencia (formulario, confirmación, animación de éxito y comprobante) y una pantalla de reserva para el resto de operaciones rápidas.

Este archivo no es un backlog de producción ni una lista de defectos de la entrega. Es lo que **habría querido sumar** si el tiempo de la prueba no hubiera sido el límite. Lo dejo explícito para los encargados de revisar el repo: recorté alcance a propósito por tiempo de entrega , no porque el producto no lo mereciera.

## Qué entregué

- Navegación con Expo Router (tabs + stack de transferencia + coming-soon).
- Validación de cuenta(en tamaño de ) y monto contra el saldo mock.
- Estado del envío en Zustand, sin backend.
- Transición visual de confirmación a éxito.
- Placeholder honesto (video en loop) en Pagar servicio, Recargar celular y Retiro sin tarjeta.
- README de arranque para Expo Go SDK 54 y respaldo en Chrome.

## Qué me hubiera gustado entregar

| Idea | Por qué | Qué hay hoy |
| --- | --- | --- |
| Secciones de Pagar Servicio, Recarga celular y Retiro sin tarjeta | Las tres acciones ya están en Inicio. Un producto LAFISE las resolvería con el mismo cuidado que la transferencia, no con un placeholder eterno. | Ruta `/coming-soon` y video en loop. |
| Apartados de Operaciones y Productos | Los tabs existen y casi no cuentan historia. Operaciones debería listar movimiento; Productos, la ficha de cada cuenta. | Textos de apoyo que redirigen a Inicio. |
| Historial de transacciones realizadas | Cierra el ciclo después del comprobante: fecha, destino, monto y estado de cada envío. | No hay listado. El draft vive en memoria y se pierde al salir. |
| Conexión a una base de datos en la capa gratuita de Supabase | Sacar saldos, productos e historial de las constantes y persistirlos en un backend real, aunque sea el plan free. | Todo mock en `constants/accounts.ts`. |
| Más fluidez en animaciones y transiciones de pantalla | El envío ya tiene una transición propia. El resto de navegación (tabs, stacks, coming-soon) se siente más seca de lo que el prototipo merece. | Animación de éxito en `/transfer`; el resto usa el default del stack. |
| Interactividad en eventos (presionar botones, cargar historial de TX) | Feedback al toque, estados de carga y vacío cuando el historial llega de red. Sin eso la app se siente estática aunque el dato exista. | `Pressable` sin microinteracción sostenida; no hay carga de transacciones. |
| Dark mode | El home verde y las pantallas blancas no tienen un tema oscuro coherente. De noche el contraste y la marca deberían aguantar igual. | Paleta clara; `useColorScheme` existe, pero la UI no lo sigue. |
| Accesibilidad más completa | Ya se respeta “reducir movimiento” en la transición. Faltarían labels en cada acción rápida, orden de foco y contraste revisado en el home verde. | Haptics + `reduceMotion` en el envío. |
