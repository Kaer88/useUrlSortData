import { useEffect, useState } from "react"
import sortProductList from "../utils/sortUtil";
import { useSearchParams } from "react-router-dom";
/*

*/
export default function useUrlSortData(initialValue) {
    const [url, setUrl] = useSearchParams()

    const [baseData, setBaseData] = useState(initialValue);
    const [currentUrlData, setCurrentUrlData] = useState({
        sort: url.get("sort"),
        order: url.get("order"),
        from: url.get("from"),
        to: url.get("to")
    })
    const [minMaxValues, setMinMaxValues] = useState({
        min: 0,
        max: null
    })

    const [sortedProducts, setSortedProducts] = useState([])


    useEffect(() => {

        if (url.get("sort") != null) {
            setCurrentUrlData(
                {
                    sort: url.get("sort"),
                    order: url.get("order"),
                    from: url.get("from"),
                    to: url.get("to"),
                }
            )
        }
    }, [])

    useEffect(() => {
        setCurrentUrlData(
            {
                sort: url.get("sort"),
                order: url.get("order"),
                from: url.get("from"),
                to: url.get("to"),
            }
        )
    }, [url])

    useEffect(() => {

        const untouchedData = Array.from(baseData);
        console.log("érintetlen adat: ", untouchedData)
        const priceFilteredData = untouchedData.filter(product => product.price > Number(currentUrlData.from) && product.price < Number(currentUrlData.to))
        console.log("filtered: ", priceFilteredData)
        const sortedArray = sortProductList(priceFilteredData, currentUrlData)
        console.log("sorted ", sortedArray)

        setSortedProducts(sortedArray)

    }, [currentUrlData, baseData])

    const initBaseData = data => {

        const max = data.reduce((acc, curr) => acc.price > curr.price ? acc : curr)

        const min = data.reduce((acc, curr) => acc.price < curr.price ? acc : curr)


        setMinMaxValues({
            min: min,
            max: max
        })

        setBaseData(data)
    }

    return {
        sortedProducts,
        initBaseData,
        minMaxValues

    }

}