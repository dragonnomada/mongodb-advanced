function pickRandom(array) {
    return array[Math.floor(Math.random() * array.length)]
}

// db: tienda

db = db.getSiblingDB("tienda");

// collection: users

// TODO: Generar 100 usuarios con datos aleatorios

// document: { name, lastname }

const user_names = ["Ana", "María", "Juana", "Roberta", "Paco", "Juan", "Pepe", "Javi", "Ron", "Fan"];

const user_lastnames = ["Benitez", "Díaz", "Domínguez", "Martínez", "González", "Espiniza", "Alvárez", "Juárez"];

const users = [];

for (let i = 0; i < 100; i++) {
    const user = {
        name: `${pickRandom(user_names)} ${pickRandom(user_names)}`,
        lastname: `${pickRandom(user_lastnames)} ${pickRandom(user_lastnames)}`
    };

    // Insertar el usuario uno por uno hacemos:
    // db.users.insertOne(user); // 0.001s * 1000 => 1s
    // -> Si falla: resolver (omitir, interrumpir, reintentar)
    // Temporales

    users.push(user);
}

// Imprimir los usuarios
// printjson(users);

// Insertar todos los usuarios a la vez hacemos:
const result = db.users.insertMany(users); // 0.1s * 1 => 0.1s
// -> Si falla: resolución (ignorar, interrumpir)
// Basado en un "caché"

printjson(result);