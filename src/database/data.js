export default class Data {

    static instance = null;

    user = {
        activityLevel: '',
        age: 0,
        weight: 0,
        height: 0,
        sexe: ''
    };

    static getInstance() {
        if (Data.instance == null) {
            Data.instance = new Data();
        }

        return this.instance;
    }

    getUser() {
        return this.user;
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
        let result = Math.round(weight * 10 + height * 6.25 - number * 5 + this.user.sexe === 'male' ? 5 : -161);

        switch (this.user.activityLevel) {
            case 'active':
                result = Math.round(result*1.55);
                break;
            case 'lowActive':
                result = Math.round(result*1.2);
                break;
            case 'sportive':
                result = Math.round(result*1.725);
        }

        return result;
    }
}