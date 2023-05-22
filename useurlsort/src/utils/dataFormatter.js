export default function dataFormatter(object) {
    if (object === undefined || object === null ) return
    return Object.keys(object).map(key => ({...object[key], id: key}))
}