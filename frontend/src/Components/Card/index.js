import{Paper} from "@material-ui/core"
import React from 'react'

import "./card.css"

function Card({card}) {
    return (
        <div className="Card">
            <Paper className="card_container">{card.title}</Paper>
            
        </div>
    )
}

export default Card
