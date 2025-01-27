const Type = Object.freeze({
    DINE_IN: 'DINE_IN',
    TAKE_AWAY: 'TAKE_AWAY',
    DELIVERY: 'DELIVERY'
});

function getType(typeString) {
    switch (typeString) {
        case 'DINE_IN':
            return Type.DINE_IN;
        case 'TAKE_AWAY':
            return Type.TAKE_AWAY;
        case 'DELIVERY':
            return Type.DELIVERY;
        default:
            throw new Error(`Unknown type: ${typeString}`);
    }
}

module.exports = Type;
