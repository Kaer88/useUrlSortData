import { useEffect, useState } from "react"
import sortProductList from "../utils/sortUtil";
import { useSearchParams } from "react-router-dom";
/*

*/
export default function useUrlSortData(initialValue) {
    const [url, setUrl] = useSearchParams()

    const [baseData, setBaseData] = useState();
    const [currentUrlData, setCurrentUrlData] = useState({
        sort: url.get("sort"),
        order: url.get("order"),
    })
    const [sortedProducts, setSortedProducts] = useState([])
    console.log(baseData)

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

    return {
        sortedProducts,
        setBaseData
    }

}