## Aplicación CRUD
Este es un proyecto CRUD (Crear, Leer, Actualizar, Eliminar) diseñado para gestionar los mismos usuarios que pueden acceder al mismo en funcion a su usuario, contrasena, rol y estado. El objetivo principal de este proyecto es proporcionar un ejemplo básico y funcional de cómo realizar operaciones CRUD en una aplicación web y validar tanto el inicio de sesion como su cierre a la hora de acceder al crud. adicional a esto se han protegido las rutas para evitar que se pueda acceder al crud sin una sesion iniciada.

## Descripción del Proyecto
Esta aplicación CRUD permite a los usuarios crear, visualizar, actualizar y eliminar usuarios. Está diseñada como un sistema flexible y fácil de extender, ideal para proyectos pequeños o como base para una aplicación más compleja.

La aplicación está construida con , Angular para el frontend, Node.js para el backend y SQL como base de datos. Demuestra un enfoque estructurado para el desarrollo full-stack, utilizando una API RESTful para interactuar con la base de datos.

## ¿Por qué estas tecnologías?
Angular/ Node.js: Elegido por su estructura modular, facilidad de reutilización de componentes y fuerte soporte de TypeScript.
.NET: Usado en el backend debido a su naturaleza asincrónica y su escalabilidad.
SQL: Usado debido a la facil interaccion y coneccion con .net

## Retos y Funcionalidades Futuras
Implementar un manejo robusto de errores fue uno de los principales desafíos, para este proyecto no se vio la necesidad de implementar JWT ya que de igual manera ese es almacenado en localStorage para implementar la logica de un usuario que ah iniciado sesion. En el futuro, si es necesario se implementara JWT para la autenticación.

## Tabla de Contenidos
Cómo Instalar y Ejecutar el Proyecto
Cómo Usar el Proyecto
Créditos
Licencia

## Cómo Instalar y Ejecutar el Proyecto
Prerrequisitos
Antes de ejecutar el proyecto, asegúrate de tener instalados los siguientes elementos:

Node.js (versión 16.x.x o superior)
Angular CLI (version 18.x.x o superior)
[Base de datos] (e.g., MySQL, MongoDB, etc.)

## Pasos de Instalación
Clona el repositorio: git clone https://github.com/juandavid003/Proyectos-2024.git
Navega al directorio del proyecto:cd proyecto-crud
Instala las dependencias necesarias: npm install
Ejecuta el proyecto:Ejecuta el proyecto:
Abre la aplicación en el navegador: http://localhost:4200

## Cómo Usar el Proyecto
Una vez que el proyecto esté en desplegado, se puede realizar las siguientes operaciones:

Iniciar Sesion: Es necesario el uso de un usuario y contrasena cuyo rol sea admin y sea estado activo para acceder al crud,
dentro del crud se podran realizar las siguentes acciones: 

Crear: Añadir una nuevo usuario navegando a la página "Crear" y completando el formulario.
Leer: Ver una lista de todos los usuarios en la página principal.
Actualizar: Seleccionar un usuario de la lista y editar sus detalles.
Eliminar: Eliminar un usuario haciendo clic en el botón de eliminar.

## Créditos
Este proyecto fue desarrollado por Juan David Ramirez. Agradecimientos especiales a Isaac Cerda y David Guaman por sus contribuciones.
Adicional el uso de recursos:

Nombre del Recurso - Youtube / Programming with Karthik
Nombre del Tutorial - angular session

## Licencia
Este proyecto está licenciado bajo MIT, Este proyecto puede ser usado, modificado y distribuido siempre que se incluya esta notificación en su versión.
