import React, {useState} from 'react'

import './product-list-item.css'
const ProductListItem = (prop) => {
    const [active, setActive] = useState(false)

    const {title,image,description} = prop.item
    
    let BtnClassName = 'button';
    let BtnItemClassName = 'hidden';
  
    let descpClassName = 'hidden';
    let imgClassName = "product-item-image"
    let arrowClassName = "arrow down"
    

    if (active) {
        BtnClassName = 'button active';
        BtnItemClassName = 'button-item'
        descpClassName = 'active';
        imgClassName = "product-item-image active"
        arrowClassName = "arrow up"
    }


    return (

        <div className="product-item">
            <div className={imgClassName} style={{backgroundImage:`url("${image}")`}}></div>
            <div className="product-item-info">
            <p>{title}</p>
            
            <div className={BtnClassName} onClick={() => {setActive(!active)}}><i className={arrowClassName}></i></div>
            <p className={descpClassName}>{description.substring(0,100) + ".."}</p>
            <button className={BtnItemClassName}>Go for it</button>
            </div>
        </div>
        
    )
}

export default ProductListItem
