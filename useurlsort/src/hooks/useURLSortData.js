import { useEffect, useState } from "react"
import sortProductList from "../utils/sortUtil";
import { useSearchParams } from "react-router-dom";


export default function useUrlSortData() {
    const [url, setUrl] = useSearchParams()
    
    const [baseData, setBaseData] = useState([]);
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
  
    const [dataForDisplay, setDataForDisplay] = useState([])


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
      
        let priceFilteredData = [];
        if(url.get("to") != null) {
            priceFilteredData = priceFilter(untouchedData);
        } else {
            priceFilteredData = untouchedData
        }
        
        const sortedArray = sortProductList(priceFilteredData, currentUrlData)


        setDataForDisplay(sortedArray)

    }, [currentUrlData, baseData])

    const priceFilter = (data) => {
        let result = [];
        const maxValue =
            currentUrlData.to === null || currentUrlData.to === "" || currentUrlData.to == 0
                ?
                minMaxValues.max
                :
                currentUrlData.to
        
        result = Array.from(data).filter(product => product.price > Number(currentUrlData.from) && product.price < Number(maxValue))
      
        return result;
    }


    const initBaseData = data => {

        const maxPriceProduct = data.reduce((acc, curr) => acc.price > curr.price ? acc : curr)
        const minPriceProduct = data.reduce((acc, curr) => acc.price < curr.price ? acc : curr)


        setMinMaxValues({
            min: minPriceProduct.price,
            max: maxPriceProduct.price
        })

        setBaseData(data)
    }

    return {
        dataForDisplay,
        initBaseData,
        minMaxValues

    }

}