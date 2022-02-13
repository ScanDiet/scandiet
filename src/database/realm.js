import Realm from "realm";

class Contact extends Realm.Object { }

Contact.schema = {
    name: "Contact",
    properties: {
        recordID: "string",
        uid: "string?",
        thumbnailPath: "string",
        givenName: "string",
        familyName: "string",
        hasThumbnail: {type: "bool", default: false},
        phoneNumber: "string",
    },
    primaryKey: "recordID",
};

class Product extends Realm.Object { }

Product.schema = {
    name: 'Product',
    primaryKey: 'barCode',
    properties: {
        barCode: 'string',
        name: 'string?',
        categories: {type : 'list', objectType: 'string', default: []},
        scanDate: 'date',
        nbScans: 'int',
        imageUrl: 'string?',
        ingredients: {type: 'list', objectType: 'string', default: []},
        allergens: {type: 'list', objectType: 'string', default: []}
    },
};

export const realm = await Realm.open({
    schema: [Product],
});
