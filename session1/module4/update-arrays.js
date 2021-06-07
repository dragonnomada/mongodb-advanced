// https://docs.mongodb.com/manual/reference/operator/update/#array

// https://docs.mongodb.com/manual/reference/operator/update/push/#mongodb-update-up.-push

db = db.getSiblingDB("tienda");

function getRandomProduct() {
    const totalProducts = db.products.count();
    return db.products.find().limit(1).skip(Math.floor(Math.random() * (totalProducts - 2))).next();
}

const product = getRandomProduct();

db.shoppingCarts.updateOne({ _id: "shopping-cart-0" }, {
    $push: {
        products: product
    }
});