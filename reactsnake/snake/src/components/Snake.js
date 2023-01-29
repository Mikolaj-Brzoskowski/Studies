import React from "react"

const Snake = (props) => {

    return (
        <div>
            {props.snakeCells.map((cell, i) => {
                const coordinates = {
                    left: `${cell.x * 5}%`,
                    top: `${cell.y * 5}%`
                }
                return (
                    <div className="snake-cell" key={i} style={coordinates}/>
                )
            })}
        </div>
    )
}

export default Snake;