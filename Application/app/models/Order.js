const Item = require('./Item');

class Order {
    constructor(id, items = []) {
        this.id = id;
        this.items = items;
        this.PayedHour = "";
        this.Type="DINE_IN";
    }


    setItems(plats) {
        const itemMap = {};

        plats.forEach(plat => {
            if (plat.shortName) {
                if (!itemMap[plat.shortName]) {
                    itemMap[plat.shortName] = { id : plat._id, shortName:plat.shortName , quantity: 0 };
                }
                itemMap[plat.shortName].quantity += 1;
            }
        });
        this.items = Object.values(itemMap).map(item => new Item(item.id,item.shortName, item.quantity));
    }
    
}


module.exports = Order;

