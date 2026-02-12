export function calculateItemsTotalPrice(items:{name:string; description:string; price:string;}[]){
    let totalItemsPrice=0;
    items.forEach(item=>totalItemsPrice+=parseFloat(item.price.replace('$','')));
    return totalItemsPrice;
}