import { useEffect, useState } from "react"
import dataFormatter from "../utils/dataFormatter"
import { useSearchParams } from "react-router-dom"
import useUrlSortData from "../hooks/useURLSortData"


export default function ProductList() {

    const [products, setProducts] = useState([])
    const [sortState, setSortState] = useState({
        sort: "name",
        order: "asc",
        to: "",
        from:""
    })
    const { sortedProducts, initBaseData, minMaxValues } = useUrlSortData(products)
    const [url, setUrl] = useSearchParams()

    

    useEffect(() => {
        fetch("https://team-02-project-fe323-default-rtdb.europe-west1.firebasedatabase.app/products.json")
            .then(res => res.json())
            .then(allProducts => {
                setProducts(dataFormatter(allProducts));
                initBaseData(dataFormatter(allProducts));

                // Problem: a hook meghívásakor az initialvalue nem jut el időben szinkronitás miatt a hook baseData state változójába
                // emiatt kénytelen voltam a baseData setter függvényt ki, van erre más megoldás? 
            })
    }, [])

    const handleSortInputChange = (e) => {
        setSortState({
            ...sortState,
            [e.target.name]: e.target.value
        })
    }

    const clickHandler = () => {

        setUrl(`?sort=${sortState.sort}&order=${sortState.order}&from=${sortState.from}&to=${sortState.to}`)

    }


    return (
        <div>
            <div>
                <div>
                    <select onChange={handleSortInputChange} name="sort">
                        <option value="name">name</option>
                        <option value="price">Ár</option>
                    </select>
                    <select onChange={handleSortInputChange} name="order">
                        <option value="desc">Csökkenő</option>
                        <option value="asc">Növekvő</option>

                    </select>
                    
                </div>
                <div>
                    <label>Min</label>
                    <input type="number" name="from" value={sortState.from} onChange={handleSortInputChange}></input>
                    <label>Max</label>
                    <input type="number" name="to" value={sortState.to} onChange={handleSortInputChange}></input>
                </div>
                <button onClick={clickHandler}>Rendezés és szűrés</button>
            </div>
            <hr></hr>
            {sortedProducts && sortedProducts.map(product => (
                <div>
                    <p>{product.title}</p>
                    <p>{product.price}</p>
                </div>

            ))
            }
        </div>
    )

}
