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
                    order: url.get("order")
                }
            )
        }
    }, [])

    useEffect(() => {
        setCurrentUrlData(
            {
                sort: url.get("sort"),
                order: url.get("order")
            }
        )
    }, [url])

    useEffect(() => {
        sortData()
    }, [currentUrlData, baseData])
    
    const sortData = () => {
        setSortedProducts(sortProductList(baseData, currentUrlData))
    }

    const initBaseData = data => {

        //levizsgálni min-t és max-ot, eltárolni és visszaadni megjelenítéshez
        const max = data.reduce((acc, curr) => acc.price > curr.price ? acc : curr)
        console.log("ez e max:", max)
        const min = data.reduce((acc, curr) => acc.price < curr.price ? acc : curr)
        console.log("ez e min:", min)

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