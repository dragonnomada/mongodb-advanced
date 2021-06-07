function pickRandom(array) {
    return array[Math.floor(Math.random() * array.length)]
}

// db: tienda

db = db.getSiblingDB("tienda");

// collection: products

// TODO: Generar 1000 productos con datos aleatorios

// schema: { name, description, brand, model, sku, price_unit, price, existances }

const brands = ["nike", "adidas", "rebook", "zara", "pull-and-bear", "coca-cola", "pepsi"];
const models = {
    "nike": ["Tennis", "Playera", "Gorra"],
    "adidas": ["Mochila", "Tennis", "Playera", "Gorra"],
    "rebook": ["Tennis", "Pants"],
    "zara": ["Blusa", "Pantalón", "Chamarra"],
    "pull-and-bear": ["Blusa", "Pantalón", "Chamarra", "Reloj", "Pulsera"],
    "coca-cola": ["Botella", "Lata"],
    "pepsi": ["Botella", "Lata"],
}

for (let i = 0; i < 1000; i++) {
    const brand = pickRandom(brands); // "nike"

    const brand_models = models[brand]; // ["Tennis", "Playera", "Gorra"]

    const model = pickRandom(brand_models); // Playera

    const itemId = Math.floor(Math.random() * 19 + 1);

    const price = Math.random() * 180 + 20;

    const price_unit = price * (Math.random() * (0.45 - 0.16) + 0.16);

    const existances = Math.floor(Math.random() * 100);

    const product = {
        name: `${model} ${brand} ${itemId}`,
        description: `${model} ${brand} ${itemId} a sólo ${price}`,
        price,
        price_unit,
        existances
    };

    const result = db.products.insertOne(product);
    
    print(`Agregando el producto ${i + 1}`);
    printjson(result);
}