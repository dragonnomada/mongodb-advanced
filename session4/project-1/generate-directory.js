db = db.getSiblingDB("callcenter");

const empresas = [
    {
        _id: "coca-cola",
        name: "Coca Cola Company",
        "menu": [
            {
                "label": "Productos nuevos",
                "phone": "+5215111111111"
            },
            {
                "label": "Atención al cliente",
                "phone": "+5215111111112"
            }
        ]
    },
    {
        _id: "pepsi",
        name: "Pepsi Company",
        "menu": [
            {
                "label": "Productos nuevos",
                "phone": "+5215222222222"
            },
            {
                "label": "Atención al cliente",
                "phone": "+5215222222223"
            },
            {
                "label": "Canjear premios",
                "phone": "+5215222222224"
            },
        ]
    },
    {
        _id: "jarritos",
        name: "Jarritos Company",
        "menu": [
            {
                "label": "Productos nuevos",
                "phone": "+5215333333333"
            },
            {
                "label": "Atención al cliente",
                "phone": "+5215333333334"
            },
            {
                "label": "Información Legal",
                "phone": "+5215333333335"
            },
            {
                "label": "Preguntas frecuentes",
                "phone": "+5215333333336"
            },
        ]
    },
]

const result = db.directory.insertMany(empresas);

printjson(result);