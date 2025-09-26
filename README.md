- [Explicación estructura](#explicación-estructura)
- [Setup](#setup)
  - [Requisitos](#requisitos)
  - [IDE](#ide)
    - [IDE recomendado](#ide-recomendado)
    - [Extensiones necesarias de VSCode](#extensiones-necesarias-de-vscode)
  - [Levantar el proyecto](#levantar-el-proyecto-en-local)
- [Requisitos para la prueba técnica](#requisitos-para-la-prueba-técnica)

# <span style="color:#6d6617">Introducción a la estructura</span>

El proyecto se estructura basándose en los principios de DDD (Domain Driven Design) y Clean Architecture. DDD es una arquitectura de software cuyo concepto central es el dominio. Éste representa el conocimiento, reglas y procesos del negocio. Sin embargo, en este proyecto no se implementa DDD de manera estricta.

El proyecto está dividido en varios Bounded Contexts:

- **BackOffice**: se encarga de la lógica de negocio relacionada con la administración y gestión interna general de la aplicación
- **Client**: se encarga de la lógica de negocio relacionada con el cliente y su experiencia en la aplicación. Éste es el que hay que implementar en la prueba

Por otro lado, existen otros elementos que, si bien no son Bounded Contexts, son importantes para la estructura del proyecto:

- **Common**: contiene código compartido entre los diferentes Bounded Contexts

Dentro de cada Bounded Context, vamos a encontrar las siguientes carpetas:

- **Carpeta services**: es la responsable de comunicarse directamente con la infraestructura (base de datos, servicios externos, etc.)

- **Carpeta UseCases**: Orquesta los flujos de trabajo y las comunicaciones entre los servicios. Es la que contienen la lógica de negocio
- **Archivo nombreBounded.module.ts**: exporta los casos de uso para que se importen desde este archivo. Es un archivo barrel file
- **Archivo nombreBounded.router.ts**: Controlador que se usará en la tRPC API. Implementa los casos de uso y sirve para validar el tipo de los datos de entrada

# <span style="color:#6d6617">Setup</span>

## <span style="color:#45672d">Requisitos</span>

- Node 22
- Docker

## <span style="color:#45672d">IDE</span>

### <span style="color:#a4846b">IDE recomendado</span>

- VSCode

### <span style="color:#a4846b">Extensiones necesarias de VSCode</span>

- Se trata de extensiones que deben ser instaladas
- El listado se puede encontrar en .vscode/extension.json
- Aparecerán cuando se abra el proyecto en VSCode

## <span style="color:#45672d">Levantar el proyecto en local</span>

- Clonar repositorio
- Crear archivo .env
  - Agregar la siguiente variable de entorno:
    - DATABASE_URL="postgres://myuser:mypassword@localhost:5454/technical-test?schema=public"
    - NEXTAUTH_SECRET="aVerySecretSecret"
    - NEXTAUTH_URL=http://localhost:3000/
- Levantar la BBDD con Docker
  - Instalar Docker Desktop
  - En terminal, ejecutar el comando → docker compose up -d local-db
- Ejecutar migraciones y seed
  - En terminal:
    - npm run db:migrate
    - npm run db:seed
- Ejecutar comando en terminal
  - npm run dev → para levantar la aplicación en local

# <span style="color:#6d6617">Requisitos para la prueba técnica</span>

- Se deberá realizar la implementación del bounded context de Cliente (usar BC de BackOffice como ejemplo)
- Parte obligatoria:
  - Implementación de las siguientes rutas:
    - /client/ ⇒ que sea una homepage de este usuario
      - En la homepage, pintar los datos del cliente (tabla Client)
      - Deberá contener un enlace a “Reservas del {clientName}” (ruta /client/{UUID}/reservation)
    - /client/{UUID}/reservation ⇒ que sea un listado de reservas del cliente logueado (es decir, del usuario logueado)
      - Deberá permitir ver sólo las reservas del cliente correspondiente al usuario logueado
      - Mostrar mensaje de error descriptivo (si se accede desde un usuario de otro cliente)
      - El filtrado debe hacerse desde el backend, no desde el frontend
      - El listado deberá tener los siguientes filtros:
        - Por nombre de la reserva
        - Por tipo de formato: "todos", "sentado", "cóctel"
        - Por estatus de la reserva: "todos", "iniciada", "por confirmar", "confirmada", "cancelada", "en gestión" (iniciada o por confirmar)
        - Por las reservas realizadas por el usuario logueado (tipo checkbox o switch)
  - Que al cliente, al logearse, se le redireccione a la sección de cliente que se encuentra en la ruta /client/
  - Ambas páginas deberán tener un buen diseño/maquetación. Se puede usar libraría de componentes
- Bonus:
  - client/{UUID}/reservation/register
    - Que sea un formulario de solicitud de reserva
    - Deberá contener los siguientes inputs: nombre de la reserva, formato, pax y fecha reserva
    - Registrarse automáticamente con el estado de “iniciada” y, como usuario que hace la reserva, el usuario logueado
    - Diseño/maquetación cuidada

- Para implementar esta prueba se deberá usar:
  - tRPC
  - Zod
  - React Hook Form

  (Consultar la documentación de las diversas librerías y el ejemplo implementado para pintar listado de admins (backOffice) y para autenticarse (common/user))
