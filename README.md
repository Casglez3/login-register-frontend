# README

Este es un proyecto de ejemplo creado con Angular. También hemos creado un backend de ejemplo que se puede encontrar con su propio README.md en el siguiente repositorio https://github.com/Casglez3/login-register-backend.git:

## Características principales:
-Autenticación de usuarios mediante inicio de sesión y registro.

-Actualización de datos de usuario (nombre de usuario y contraseña).

-Eliminación de cuentas de usuario.

-Validación de contraseñas en formularios.

-Uso de Tailwind CSS para que la interfaz de usuario quede dotada de estilos.

## Tecnologías utilizadas:
-**Angular:** Versión 18.2.0 y superior. Framework de JavaScript para construir aplicaciones web.

-**TypeScript:** Versión 5.5.2, compatible con Angular 18.

-**RxJS:** Para el manejo de programación reactiva. Versión 7.8.0.

-**Tailwind CSS:** Versión 3.4.13, para estilos de la interfaz.

-**HTTP Client de Angular:** Para realizar solicitudes HTTP al backend.

-**Cypress:** Para pruebas end-to-end (e2e). Se eligió Cypress debido a que Protractor se encuentra deprecado y no se pudo instalar correctamente en el proyecto, lo que llevó a la búsqueda de alternativas que fueran compatibles y ofrecieran un mejor soporte a este proyecto.

## Requisitos:
-**Node.js:** Versión 14 o superior.

-**Angular CLI:** Instalar globalmente para la gestión del proyecto.

-**Cypress:** Instalado como dependencia de desarrollo.

-**TypeScript** (versión compatible con Angular 18)

## Configuración del entorno:
Antes de ejecutar el proyecto, asegúrate de que el backend esté funcionando y configurado correctamente. El frontend se comunica con la API del backend para las operaciones de autenticación y gestión de usuarios.

-**Instalación:**
Clona el repositorio:
`git clone https://github.com/Casglez3/login-register-frontend.git`

`cd app-frontend`

-**Instala las dependencias:**
`npm install`

-**Instala Tailwind CSS:**
`npm install -D tailwindcss postcss autoprefixer`

-**Luego, inicializa Tailwind CSS:**
`npx tailwindcss init -p`

Esto generará tailwind.config.js

-**Configura los estilos de Tailwind:**
Agrega las rutas de tus archivos de plantilla en el archivo tailwind.config.js:

` /** @type {import('tailwindcss').Config} */ `

`module.exports = { `

 ` content: [ "./src/**/*.{html,ts}"],`

 ` theme: {`

 `   extend: {},`

 ` },`

 ` plugins: [],`

`} `

-**Luego, incluye las directivas de Tailwind en tu archivo CSS (src/styles.css):**
`@tailwind base;`

`@tailwind components;`

`@tailwind utilities;`

-**Configuración de TypeScript:**
Asegúrate de tener un archivo de configuración de TypeScript (tsconfig.json) en la raíz del proyecto. 

## Ejecución de la aplicación:
Para iniciar la aplicación, utiliza el siguiente comando:

`npm start`

Esto lanzará la aplicación en http://localhost:4200/

## Rutas disponibles:
-**Autenticación**

Registro de usuario: Permite a los nuevos usuarios registrarse.

Inicio de sesión: Permite a los usuarios existentes iniciar sesión en su cuenta.

-**Gestión de usuario**

Actualizar usuario: Los usuarios pueden actualizar su nombre de usuario y contraseña.

Eliminar usuario: Los usuarios pueden eliminar su cuenta.

Las rutas de gestión de usuario se encuentran protegidas y se requiere autenticación previo registro para poder hacer uso de estas funcionalidades.

## Pruebas End-to-End (e2e)
Para ejecutar las pruebas e2e, utiliza el siguiente comando:

`ng e2e`

Esto abrirá la interfaz de Cypress, donde podrás ejecutar las pruebas de manera interactiva.

## Cobertura de Pruebas
Las pruebas incluyen:

-**Visita de la página inicial:** Verifica que la página de inicio de sesión se carga correctamente.

-**Registro de usuario:** Prueba el registro de nuevos usuarios y la redirección a la página de inicio de sesión.

-**Inicio de sesión:** Prueba el inicio de sesión y la correcta visualización de la página de usuario.

-**Cierre de sesión:** Verifica que el usuario puede cerrar sesión.

-**Eliminación de usuario:** Prueba la eliminación de cuentas de usuario.

-**Actualización de usuario:** Prueba la actualización de datos del usuario.


## En cuanto a la organización general de la aplicación y las decisiones tomadas podemos destacar:
**app:** Aquí se encuentra la lógica principal de la aplicación. Al tener los componentes organizados en subcarpetas (como auth y user), se permite una clara agrupación de funcionalidades relacionadas.
La decisión de utilizar componentes standalone mejora la modularidad y la reutilización, permitiendo que cada componente se cargue de manera independiente y reduzca la complejidad del manejo de módulos.

**<u>Carpeta app/:</u>** Alberga la lógica de la aplicación, dividiéndola en diferentes módulos o funcionalidades.

**<u>Carpeta app/auth/</u>:** Centraliza todo lo relacionado con la autenticación, lo que permite un acceso rápido y organizado a las funcionalidades de login y registro.

**app/auth/components/:**

**login.component.ts y registration.component.ts:** Estos componentes manejan la lógica y la presentación para las funcionalidades de login y registro respectivamente.


**app/auth/services/:**

**auth.service.ts:** Este servicio maneja la lógica de negocio relacionada con la autenticación, como el login, el registro y el manejo del estado de autenticación.
Implementar un service para manejar las solicitudes HTTP y el estado de la autenticación promueve la separación de preocupaciones, permitiendo que los componentes se enfoquen en la presentación.
El uso de BehaviorSubject para el estado de autenticación permite a los componentes reaccionar a cambios en el estado de la autenticación de manera eficiente.


**<u>Carpeta guards/:</u>**
auth.guard.ts: Implementa la lógica de protección de rutas, verificando si el usuario está autenticado antes de permitir el acceso a ciertas páginas.
Uso de guardas para manejar la lógica de seguridad en las rutas, mejorando la seguridad y la experiencia del usuario.
Verificación de autenticación centralizada, que permite una gestión más clara de los accesos.


**<u>Carpeta navbar/:</u>**
navbar.component.ts: Maneja la lógica de presentación y el estado de autenticación para mostrar diferentes enlaces en la barra de navegación.
Uso de suscripciones al AuthService para actualizar la interfaz en tiempo real según el estado de autenticación del usuario.


**<u>Carpeta user/:</u>**

**user/components/:**

**user-home.component.ts:** Define la lógica y funcionalidad de la interfaz de usuario donde los usuarios pueden actualizar sus datos y eliminar su cuenta.
Se implementó el componente UserHomeComponent utilizando formularios reactivos, lo que permite una gestión más eficiente de la validación de los datos del usuario. Este enfoque mejora la experiencia del usuario, ya que se pueden mostrar mensajes de error y éxito de manera efectiva. Además, el componente se encarga de manejar tanto la actualización de datos como la eliminación de la cuenta, lo que centraliza la lógica relacionada con la gestión del usuario en un solo lugar.

**user/services/:**

**user.service.ts:** Este archivo implementa los métodos necesarios para comunicarse con la API backend. Incluye funciones para actualizar y eliminar la información del usuario, utilizando HttpClient para realizar solicitudes HTTP.
El UserService encapsula la lógica de actualización y eliminación de datos del usuario, promoviendo una clara separación de responsabilidades. Utiliza HttpClient para realizar solicitudes HTTP seguras y maneja errores de forma que informa al usuario sobre el estado de las operaciones, lo que mejora la robustez de la aplicación.


**<u>Carpeta cypress:</u>**


**spec.cy.ts:** Este archivo implementa pruebas de extremo a extremo (E2E) utilizando Cypress para validar el comportamiento de la aplicación. Las pruebas están organizadas en funciones reutilizables como login, logout, register, y deleteUser, que encapsulan la lógica de interacción con la interfaz de usuario.