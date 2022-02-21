const lang = 'fr';
const apiUrl = 'https://' + lang + '.openfoodfacts.org';

export function getProductInfoFromApi(barcode: string) {
    const url = apiUrl + '/api/v0/product/' + barcode + '.json';
    return fetch(url)
        .then((response) => response.json())
        .catch() //network fail is handled in call in Product.js
}

export function parseProductInfo(json: { status: number; code: string | any[]; product: any; }, barcode: any) {
    if (json.status !== 0 && json.code && json.code.length > 0) {
        let jsonProduct = json.product;

        return {
            _id: json.code,
            product_name: jsonProduct.product_name_fr,
            image_url: jsonProduct.image_url,
            quantity: jsonProduct.quantity,
            packaging: jsonProduct.packaging,
            brands: jsonProduct.brands,
            manufacturing_places: jsonProduct.manufacturing_places,
            categories: jsonProduct.categories,
            ingredients: jsonProduct.ingredients_text_with_allergens,
            allergens: jsonProduct.allergens_from_ingredients,
            nutrition_grades: jsonProduct.nutrition_grades,
            nova_group: jsonProduct.nova_group,
            allergens_ids: jsonProduct.allergens_tags,
            nutriments: jsonProduct.nutriments,
            vegan: jsonProduct.vegan,
            nutrients_levels: jsonProduct.nutrients_levels,
            nutriscore_data: jsonProduct.nutriscore_data
        };
    } else {
        return {};
    }
}
