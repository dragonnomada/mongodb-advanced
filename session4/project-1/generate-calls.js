db = db.getSiblingDB("callcenter");

const phones = [...Array(100)].map(_ => `+${Math.random().toString(10).slice(2, 15)}`);

// printjson(phones);

for (let i = 0; i < 1000; i++) {
    const phone = phones[Math.floor(Math.random() * phones.length)];

    const directoryCount = db.directory.count();

    const directoryIndex = Math.floor(Math.random() * directoryCount);

    const empresa = db.directory.find().limit(1).skip(Math.min(directoryCount - 1, directoryIndex)).next();

    const menuOptionIndex = Math.floor(Math.random() * empresa.menu.length);

    const menuOption = empresa.menu[menuOptionIndex];

    const incommingDate = new Date();

    incommingDate.setSeconds(incommingDate.getSeconds() - Math.floor(Math.random() * 1000))

    const outcommingDate = new Date(incommingDate);

    outcommingDate.setSeconds(outcommingDate.getSeconds() + Math.floor(Math.random() * 2000));

    const call = {
        "incommingPhone": phone,
        "outcommingName": empresa.name,
        "outcommingDial": menuOptionIndex,
        "outcommingPhone": menuOption.phone,
        "transferAt": incommingDate.toISOString(),
        "retransferAt": outcommingDate.toISOString(),
        "status": "closed",
        "rating": Math.min(Math.floor(Math.random() * 5 + 1), 5),
    };

    db.calls.insertOne(call)

    // printjson(call)
}

// const result = db.directory.insertMany(empresas);

// printjson(result);