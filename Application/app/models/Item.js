class Item {
    constructor(id,name, quantity, ingredients = []) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.ingredients = ingredients;
        this.category = "";
        this.type="";
    }


    toString() {
        return `Item : 
            ID : ${this.id}
            Nom : ${this.name} 
            Quantité : ${this.quantity} 
            Ingredient : ${JSON.stringify(this.ingredients)}
            Catégorie : ${this.category}
            Type : ${this.type}\n`;
    }

}
module.exports = Item;