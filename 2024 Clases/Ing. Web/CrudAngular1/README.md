## Aplicación CRUD
Este es un proyecto CRUD (Crear, Leer, Actualizar, Eliminar) diseñado para gestionar usuarios, donde cada uno puede acceder según su usuario, contraseña, rol y estado. El objetivo principal de este proyecto es proporcionar un ejemplo básico y funcional de cómo realizar operaciones CRUD en una aplicación web, validando tanto el inicio como el cierre de sesión. Además, las rutas están protegidas para evitar accesos no autorizados al CRUD sin una sesión iniciada.

El proyecto también incluye una tabla de tareas. Este módulo CRUD permite gestionar tareas y filtrar los datos enviados al API mediante un rango de fechas de inicio y fin, para luego aplicarlos como parámetros de filtrado en la nueva tabla de tareas.

## Descripción del Proyecto
Esta aplicación CRUD permite a los usuarios crear, visualizar, actualizar y eliminar registros de usuarios y tareas. Está diseñada como un sistema flexible y fácil de extender, ideal para proyectos pequeños o como base para una aplicación más compleja.

La aplicación está construida con Angular para el frontend, Node.js para el backend y SQL como base de datos. El proyecto demuestra un enfoque estructurado para el desarrollo full-stack, utilizando una API RESTful para interactuar con la base de datos.

Para el despliegue de esta arquitectura se utilizó AWS, específicamente RDS para consultar la base de datos de manera remota y EC2 para alojar el backend (ASP.NET) y el frontend (Angular).

## ¿Por qué estas tecnologías?
Angular/Node.js: Elegido por su estructura modular, facilidad de reutilización de componentes y fuerte soporte de TypeScript.
.NET: Usado en el backend debido a su naturaleza asincrónica y escalabilidad.
SQL: Elegido por su facilidad de integración con .NET.
AWS: Utilizado como un desafío personal para experimentar la complejidad de desplegar en una plataforma conocida (versión de prueba de 7 días).

## Retos y Funcionalidades Futuras
Implementar un manejo robusto de errores fue uno de los principales desafíos, para este proyecto no se vio la necesidad de implementar JWT ya que de igual manera ese es almacenado en localStorage para implementar la logica de un usuario que ah iniciado sesion. En el futuro, si es necesario se implementara JWT para la autenticación.
En general este README junto al video ser de gran ayuda para el como realizar el deploy de estas arquitecturas combinadas.

## Tabla de Contenidos
Cómo Instalar y Ejecutar el Proyecto
Pasos de Instalación
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
Abre la aplicación en el navegador: http://localhost:4200

## Cómo Usar el Proyecto
Una vez que el proyecto esté en desplegado, se puede realizar las siguientes operaciones:

Módulo de Usuarios (CRUD):
Iniciar Sesión: Es necesario ingresar un usuario y contraseña cuyo rol sea administrador y que esté en estado activo para acceder al CRUD de usuarios.

Crear Usuario: Añadir un nuevo usuario navegando a la página "Crear" y completando el formulario.

Leer Usuarios: Ver una lista de todos los usuarios registrados en la página principal.

Actualizar Usuario: Seleccionar un usuario de la lista y editar sus detalles.

Eliminar Usuario: Eliminar un usuario haciendo clic en el botón de eliminar.


Módulo de Tareas (CRUD):
Crear Tarea: Añadir una nueva tarea navegando a la página "Crear" y completando el formulario, especificando un rango de fechas de inicio y fin.

Leer Tareas: Ver una lista de todas las tareas disponibles, con la opción de filtrar por fechas de inicio y fin.

Actualizar Tarea: Seleccionar una tarea de la lista y editar sus detalles, incluyendo el rango de fechas.

Eliminar Tarea: Eliminar una tarea haciendo clic en el botón de eliminar.


## Créditos
Este proyecto fue desarrollado por Juan David Ramirez. Agradecimientos especiales a Isaac Cerda y David Guaman por sus contribuciones.
Adicional el uso de recursos:

Nombre del Recurso - Youtube / Programming with Karthik
Nombre del Tutorial - angular session

Nombre del Recurso - Youtube / Fabiana Vásconez
Nombre del Tutorial - MINICORE
Link: https://www.youtube.com/watch?v=GieEHFF29eo

## Licencia
Este proyecto está licenciado bajo MIT, Este proyecto puede ser usado, modificado y distribuido siempre que se incluya esta notificación en su versión.
