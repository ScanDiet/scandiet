import {element} from "prop-types";

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

    productCalories({q, serving_kcal}) {
        return serving_kcal * q;
    }

    mealCalories(meal){
        let val = 0;
        this.user.products[meal].forEach(element => {
               val += element.product.nutriments.energy-kcal;
            }
        )
        return val;
    }

    getTodayCalories() {
        let cal = 0;
        /*for (const [key, value] of Object.entries(this.user.products)) {
            console.log(`${key}: ${value}`);
            cal += this.mealCalories(key)
        }*/
        Object.keys(this.user.products).forEach(element => {
            cal += this.mealCalories(key);
        })
        return cal;
    }

    registerProduct(meal, q, product) {
        this.user.products[meal].push({
            quantity: q,
            product: product
        })
    }

    getMealContents(meal) {
        return this.user.products[meal];
    }

    registerMeal(_meal) {
        this.user.products[_meal] = [];
    }

    getAllMeals(){
        return Object.keys(this.user.products);
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


}
