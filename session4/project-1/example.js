db = db.getSiblingDB("callcenter");

// TODO: Inserta 3 empresas en la colección `directory`

// TODO: Inserta 1000 llamadas en la colección `calls`

// Hint 1. Crea un arreglo con 100 números aleatorios distintos (números de clientes)

// Hint 2. Al realizar la llamada obtén la empresa a la que se quiere llamar
// y selecciona una opción aleatoria entre las disponibles

// Hint 3. Retén en variables el número del cliente seleccionado aleatoriamentem
// los datos de una empresa seleccionada aleatoriamente, los datos de una
// opción del `menu` dial seleccionado aleatoriamente y el teléfono de la opción

// Hint 4. Crea una fecha y agrega/quita aleatoriamente segundos para simular 
// la fecha en el pasado o en el futuro

// Hint 5. Coloca el status a "closed" o simula otros status como "in-call" o "break"

// Hint 6. Calcula un rating aleatorio entero usando 
// `const rating = Math.ceil(Math.random() * 4 + 1)` // rating del 1 al 5