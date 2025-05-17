Pasos para ejecutar Frontend:
npm i para instalar todas las dependencias
npm run dev para ejecutar el proyecto

Pasos para ejecutar el backend:
npx json-server --watch db.json --port 3001

En el archivo .env se encuentra la unica variable de entorno para esta prueba

Arquitectura usada:
No se implemento alguna arquitectura, se implementó el patron de diseño compound components, el cual es uno de los
mejores patrones de diseño para react, consiste en crear un contexto para tener todos los componente necesarios y evitar el uso de props porque se tendrian variables globales que las reemplacen.
Y se utilizo custom hooks para logicas como las llamadas al backend y separarlas de la vista.

Decisiones tecnicas:
Para estados globales se implementó TanStack Query, es un gestor de estado que al contrar con su cache propio, permite reducir el guardado de datos que vienen del backend en la vista, mejorando el rendimiento y brindando facilidadde edición de la data obtenida sin tener que hacer uso de estados adicionales.
Psra la validación de formulario de utilizó React Hook Form, una libreria que permite validar y manipular formularios fuera y dentro del componente que se requiere.
Para estilos se utilizo TailwindCSS y Material UI.