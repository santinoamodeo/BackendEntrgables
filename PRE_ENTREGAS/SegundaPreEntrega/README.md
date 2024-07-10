# Desafío 7 - Segunda entrega del proyecto final

Este repositorio contiene el código fuente para el Desafío 7, titulado "Segunda Pre Entrega del Proyecto Final". En este desafío, se utiliza Handlebars como motor de plantillas.

## Requisitos previos

- Node.js: Asegúrate de tener Node.js instalado en tu máquina.

## Configuración

1. Clona este repositorio en tu máquina local utilizando el siguiente comando:

```
   $ git clone https://github.com/maurogarro73/proyectoFinal2-Backend-MauroGarro
```

2. Instala las dependencias del proyecto ejecutando el siguiente comando:

```
   $ npm install
```

## Ejecución

1. Inicia la aplicación ejecutando el siguiente comando:

```
   $ npm run dev
```

2. Abre tu navegador web y visita `http://localhost:8080/api/products` o `http://localhost:8080/api/carts` para un uso como backend.

3. Abre tu navegador web y visita `http://localhost:8080/products`, `http://localhost:8080/carts`, `http://localhost:8080/chat o para un uso como frontend.

## Objetivos generales

- Utilizar Mongo como sistema de persistencia principal.
- Definir todos los endpoints necesarios para trabajar con productos y carritos.

## Objetivos específicos

- Profesionalizar las consultas de productos, implementando filtros, paginación y ordenamientos avanzados.
- Mejorar la gestión de carritos utilizando los últimos conceptos vistos.

## Uso

- Para utilizar el método GET / con los nuevos parámetros de consulta, puedes realizar una solicitud GET con las siguientes características:

```
   $ http://localhost:8080/api/products/?limit=<valor>

   $ http://localhost:8080/api/products/?page=<valor>

   $ http://localhost:8080/api/products/?sort=<asc|desc>

   $ http://localhost:8080/api/products/?query=<valor>
```

- Todas en forma separa o combinadas.

## Postman

Link a [Postman](https://documenter.getpostman.com/view/27127581/2s93sdZBu3)
