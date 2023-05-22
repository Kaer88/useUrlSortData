export default function sortProductList(products, options) {
    if (products === undefined) return;
    let copy = Array.from(products)
    switch (options.sort) {
        case "name": copy.sort(compareName); break
        case "price": copy.sort(comparePrice); break
        case "date": copy.sort(compareDate); break
        case "totalcost": copy.sort(compareTotalCost); break
        case "username": copy.sort(compareUsers); break
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

const compareUsers = (a, b) => {
    if (a.name < b.name) {
        return -1
    }
    if (a.name > b.name) {
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
