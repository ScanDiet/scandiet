export default class Data {

    static instance = null;

    user = "";

    static getInstance() {
        if (Data.instance == null) {
            Data.instance = new Data();
        }

        return this.instance;
    }

    getUser() {
        return this.user;
    }

    updateUser(properties) {
        this.user = Object.assign({}, this.user, properties);
    }
}