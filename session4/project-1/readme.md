# Proyecto 1 - Llamadas telefónica

## Introducción

Un callcenter se dedica a transferir llamadas de atención al cliente hacia las empresas, marcando el número del cliente que llama, la empresa a la que se dirige, la opción que elige el usuario de un menú `dial`, el número de la empresa que recibe la llamada transferida y la hora en la que se transfirió la llamada, la hora en la que se devolvió la llamada transferida y una `valoración` del 1 al 5 por parte del usuario sobre la atención que recibió.

## Generar una base de datos llamada `callcenter`

* La colección `directory` debe contener la información de las empresas afiliadas al callcenter.
* La colección `calls` debe registrar cada llamada en el formato descrito.

_Nota_: Generar números de clientes aleatorios, pero que se repitan (por ejemplo 1,000). Al menos 3 empresas afiliadas con al menos 2 números telefónicos cada una para dos opciones de menú `dial` distintas.

> Ejemplo de un registro de la colección `directory`

```json
{
    "_id": "mi-empresa",
    "name": "Mi Empresa S.A de C.V",
    "menu": [
        {
            "label": "Robo o pérdida de tarjeta",
            "phone": "+5215512345678"
        },
        {
            "label": "Llamarle a un ejecutivo",
            "phone": "+5215598765432"
        }
    ]
}
```

> Ejemplo de un registro de la colección `calls`

```json
{
    "_id": "abc123",
    "incommingPhone": "+5215534562345",
    "outcommingName": "mi-empresa",
    "outcommingDial": 1,
    "outcommingPhone": "+5215598765432",
    "transferAt": "2021-06-10T15:43:19.000Z",
    "retransferAt": "2021-06-10T15:54:43.000Z",
    "status": "closed",
    "rating": 2,
}
```

## Ejercicio 1 - Obtener la colección `customers`

* Crea una agregación que recorra todas las llamadas de `calls` y recupere todos los números de entrada distintos
* Guarda la agregación mediante `$merge` en la colección `customers` anotando el número de teléfono como el campo `phone` y como identificador el teléfono sin el símbolo `+`

> Ejemplo de un registro en la colección `customers`

```json
{
    "_id": "5215534562345",
    "phone": "+5215534562345"
}
```

## Ejercicio 2 - Agregarle a cada `customer` el número de llamadas que ha realizado en cada empresa

* Mezclar la agregación resultante con `$merge` en la colección `customers`

> Ejemplo de un registro en la colección `customers` con las llamadas realizadas a las empresas

```json
{
    "_id": "5215534562345",
    "phone": "+5215534562345",
    "calls": {
        "mi-empresa": 10,
        "tu-empresa": 6,
        "otra-empresa": 1
    }
}
```

## Ejercicio 3 - Agregarle a cada empresa del directorio el número de llamadas que ha recibido

> Ejemplo de un registro del directorio (colección `directory`) tras contar las llamadas que ha recibido

```json
{
    "_id": "mi-empresa",
    "name": "Mi Empresa S.A de C.V",
    "menu": [
        {
            "label": "Robo o pérdida de tarjeta",
            "phone": "+5215512345678"
        },
        {
            "label": "Llamarle a un ejecutivo",
            "phone": "+5215598765432"
        }
    ],
    "calls": 8456
}
```

## Ejercicio 4 - Agregarle a cada empresa del directorio el número de llamadas que ha recibido de usuarios distintos

> Ejemplo de un registro del directorio (colección `directory`) tras contar las llamadas que ha recibido de usuarios distintos

```json
{
    "_id": "mi-empresa",
    "name": "Mi Empresa S.A de C.V",
    "menu": [
        {
            "label": "Robo o pérdida de tarjeta",
            "phone": "+5215512345678"
        },
        {
            "label": "Llamarle a un ejecutivo",
            "phone": "+5215598765432"
        }
    ],
    "calls": 8456,
    "callsDistinct": 6789
}
```

## Ejercicio 5 - Agregarle a cada empresa del directorio el número de clientes distintos que han marcado a la empresa

> Ejemplo de un registro del directorio (colección `directory`) tras contar los clientes distintos que han marcado a la empresa

```json
{
    "_id": "mi-empresa",
    "name": "Mi Empresa S.A de C.V",
    "menu": [
        {
            "label": "Robo o pérdida de tarjeta",
            "phone": "+5215512345678"
        },
        {
            "label": "Llamarle a un ejecutivo",
            "phone": "+5215598765432"
        }
    ],
    "calls": 8456,
    "callsDistinct": 6789,
    "customers": 245
}
```

## Ejercicio 6 - Agregarle a cada empresa del directorio el tiempo total de llamadas en segundos

> Ejemplo de un registro del directorio (colección `directory`) tras calcular el tiempo total de llamadas en segundos

```json
{
    "_id": "mi-empresa",
    "name": "Mi Empresa S.A de C.V",
    "menu": [
        {
            "label": "Robo o pérdida de tarjeta",
            "phone": "+5215512345678"
        },
        {
            "label": "Llamarle a un ejecutivo",
            "phone": "+5215598765432"
        }
    ],
    "calls": 8456,
    "callsDistinct": 6789,
    "customers": 245,
    "totalCallTime": 12345678
}
```

## Ejercicio 7 - Agregarle a cada empresa del directorio la valoración promedio de las llamadas

> Ejemplo de un registro del directorio (colección `directory`) tras calcular la valoración promedio de las llamadas

```json
{
    "_id": "mi-empresa",
    "name": "Mi Empresa S.A de C.V",
    "menu": [
        {
            "label": "Robo o pérdida de tarjeta",
            "phone": "+5215512345678"
        },
        {
            "label": "Llamarle a un ejecutivo",
            "phone": "+5215598765432"
        }
    ],
    "calls": 8456,
    "callsDistinct": 6789,
    "customers": 245,
    "totalCallTime": 12345678,
    "rating": 2.1
}
```