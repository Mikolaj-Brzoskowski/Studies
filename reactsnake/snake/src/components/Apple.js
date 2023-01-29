import React from "react"

const Apple = (props) => {

    const coordinates = {
        left: `${props.appleCell.x * 5}%`,
        top: `${props.appleCell.y * 5}%`
    }

    return (
        <div className="apple-cell" style={coordinates}/>
    )
}

export default Apple;