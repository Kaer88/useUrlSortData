export default function sortProductList(products, options) {
    if (products === undefined) return;
    let copy = Array.from(products)
    switch (options.sort) {
        case "name": copy.sort(compareName); break
        case "price": copy.sort(comparePrice); break
        case "date": copy.sort(compareDate); break
        case "totalcost": copy.sort(compareTotalCost); break
    }

    if (options.order === "desc") copy.reverse()

    return copy

}

const compareName = (a, b) => {
    if (a.title < b.title) {
        return -1
    }
    if (a.title > b.title) {
        return 1
    }
    return 0
}

const comparePrice = (a, b) => {
    return a.price - b.price
}

const compareTotalCost = (a, b) => {
    return a.totalCost - b.totalCost
}

const compareDate = (a, b) => {
    return Date.parse(a.date) - Date.parse(b.date)
}


export const searchMinValue = (products) => {
    let val = 0
    Object.values(products).forEach(curr => {
        if (Number(curr.price) < val) val = curr.price;
    }
    )
    return val
}
export const searchMaxValue = (products) => {
    let val = 0;
    Object.values(products).forEach(curr => {
        if (Number(curr.price) > val) val = curr.price;
    }
    )
    return val
}
export const validPrice = (minValue, maxValue, price) => {
    return minValue <= price && maxValue >= price;
}
export const priceFilter = (minValue, maxValue, products) => {
    return products.filter(item => validPrice(minValue, maxValue, Number(item.price)))
}
