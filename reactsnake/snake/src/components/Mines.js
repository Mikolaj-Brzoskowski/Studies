import React from "react"

const Mines = (props) => {

    return (
        <div>
            {props.minesCells.map((cell, i) => {
                const coordinates = {
                    left: `${cell.x * 5}%`,
                    top: `${cell.y * 5}%`
                }
                return (
                    <div className="mines-cell" key={i} style={coordinates}/>
                )
            })}
        </div>
    )
}

export default Mines;