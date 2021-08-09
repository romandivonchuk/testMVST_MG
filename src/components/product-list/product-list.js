import React from 'react'
import ProductListItem from '../product-list-item'
import './product-list.css'

const ProductList = (props) => {
    return (
        <div className="product-list">
            {props.data.map((prod, idx)=> <ProductListItem key={idx} item={prod} /> )}
        </div>
    )
}

export default ProductList
