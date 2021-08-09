import React from 'react'
import './header.css'

const Header = (props) => {
    

    return (
        <div className="header">
            <button onClick={(e) => props.handlerCategory(e)} className={props.url === "4b20aa37-9e1a-4155-82e0-386d171cb1f0" ? "ActiveBtn" : ""} value={"4b20aa37-9e1a-4155-82e0-386d171cb1f0"}>Pets</button>
            <button onClick={(e) => props.handlerCategory(e)} className={props.url === "b0e78282-d457-4790-97f0-d5c0642bee4d" ? "ActiveBtn" : ""}
            value={"b0e78282-d457-4790-97f0-d5c0642bee4d"}>Food</button>
            <button onClick={(e) => props.handlerCategory(e)} className={props.url === "10a827d5-13b5-4cd6-a2d0-9f22dd7738d1" ? "ActiveBtn" : ""}
            value={"10a827d5-13b5-4cd6-a2d0-9f22dd7738d1"}>Plants</button>
        </div>
    )
}

export default Header
