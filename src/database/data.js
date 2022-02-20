
export default class Data {

    static instance = null

    user = {
        activityLevel: '',
        age: 0,
        weight: 0,
        height: 0,
        sexe: '',
        products: {
            'Breakfast': [],
            'Lunch': [],
            'Dinner': []
        },
        favProducts: []
    };

    registerProduct(meal, q, product) {
        console.log(meal);
        console.log(q);
        console.log(product)
        this.user.products[meal].push({
            quantity: q,
            product: product
        })
    }

    static getInstance() {
        if (Data.instance == null) {
            Data.instance = new Data();
        }

        return this.instance;
    }

    getUser() {
        return this.user;
    }

    getAllFavoritesProducts() {
        return this.user.favProducts;
    }

    addProductToFavorites(product) {
        this.user.favProducts.push(product);
    }

    removeProductToFavorites(product) {
        this.user.favProducts.filter(p => {return p !== product});
    }

    /**
    * Updates de users properties.
    *
    * @param {object} properties Example : {
    *   activityLevel: 'sedentary' / 'active' / 'lowActive' / 'sportive',
    *   age: 20,
    *   weight: 70,
    *   height: 170,
    *   sexe: 'female' / 'male'
    * }
    */
    updateUser(properties) {
        this.user = Object.assign({}, this.user, properties);
    }

    getBaseCalories() {
        let result = Math.round((this.user.weight * 10) + (this.user.height * 6.25) - (this.user.age * 5) + (this.user.sexe === 'male' ? 5 : -161));

        switch (this.user.activityLevel) {
            case 'active':
                result = Math.round(result*1.55);
                break;
            case 'lowActive':
                result = Math.round(result*1.375);
                break;
            case 'sportive':
                result = Math.round(result*1.725);
            case 'sedentary':
                result = Math.round(result*1.2);
        }

        return result;
    }

    getTodayCalories() {
        return 0;
    }
}
