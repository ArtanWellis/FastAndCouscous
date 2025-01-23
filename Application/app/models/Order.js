class Order {
    constructor(id, items = [],PayedHour) {
        this.id = id;
        this.items = items;
        this.PayedHour= PayedHour;
        this.Type="DINE_IN";
    }


    setItems(items) {
        items.forEach(item => {
            if(item.shortName != undefined){
                this.items.push(item);
            }
        });
        console.log(this.items);
    }


    
    toString() {
        return `Order ID: ${this.id}, Payed Hour: ${this.PayedHour}, Type: ${this.Type}, Items: ${JSON.stringify(this.items)}`;
    }
}


module.exports = Order;

