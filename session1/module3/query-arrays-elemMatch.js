// https://docs.mongodb.com/manual/reference/operator/query/elemMatch/#mongodb-query-op.-elemMatch

db = db.getSiblingDB("tienda");

const shoppingCarts = db.shoppingCarts.find({
    products: { // Es un arreglo [ { name, ..., existances }, ... ]
        $elemMatch: { // Todos los que coincidan en elemento { name, description, ..., existances }
            existances: 0
        }
    }
}).toArray();

print(`Se encontraron ${shoppingCarts.length} carritos que contienen productos agotados`);

for (let shoppingCart of shoppingCarts) {
    // TODO: Enviarle un correo o notificación al usuario del carrito para avisarle que tiene un producto agotado
    print(`Hola ${shoppingCart.user.name}, tu carrito ${shoppingCart._id} tiene un producto agotado :(`)
}