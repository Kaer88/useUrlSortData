import { useEffect, useState } from "react"
import dataFormatter from "../utils/dataFormatter"
import { useSearchParams } from "react-router-dom"
import useUrlSortData from "../hooks/useURLSortData"


export default function ProductList() {

    const [products, setProducts] = useState([])
    const [sortState, setSortState] = useState({
        sort: "name",
        order: "asc"
    })
    const { sortedProducts, setBaseData } = useUrlSortData(products)
    const [url, setUrl] = useSearchParams()


    useEffect(() => {
        fetch("https://team-02-project-fe323-default-rtdb.europe-west1.firebasedatabase.app/products.json")
            .then(res => res.json())
            .then(allProducts => {
                setProducts(dataFormatter(allProducts));
                setBaseData(dataFormatter(allProducts));

                // Problem: a hook meghívásakor az initialvalue nem jut el (időben?) a hook baseData state változójába
                // emiatt kénytelen voltam a baseData setter függvényt ki
            })
    }, [])

    const handleSortInputChange = (e) => {
        setSortState({
            ...sortState,
            [e.target.name]: e.target.value
        })
    }

    const clickHandler = () => {

        setUrl(`?sort=${sortState.sort}&order=${sortState.order}`)



        // url.set('sort', sortState.sort);
        // url.set('order', sortState.order)

    }
    return (
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
                <button onClick={clickHandler}>Rendezés</button>
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
