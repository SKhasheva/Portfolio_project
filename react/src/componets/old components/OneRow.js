import React from "react"



function OneRow(props) {
    return (
        <tr>
            <td>{props.ticker}</td>
            <td>{props.cost}</td>
            <td>{props.cnt}</td>
            <td>{props.price}</td>
            <td><input type="number" onChange={this.handleChange}/></td>
        </tr>
    )
}




export default OneRow



