import React from 'react'
import {CssBaseline, Typography} from "@material-ui/core"
import {CustomPaper} from "../../StyledComponents/index"
import Title from './Title'
import "./lists.css"
import Card from "../Card"
import AddInput from '../addInput'



function Lists({list}) {
    return (
        <div >
            <CustomPaper className="list_background">
                <CssBaseline />
                <Title  title={list.title} listId={list.id}/>
               {list.cards.map((card)=>(
                   <Card key={card.id} card={card} />
               ))}
                <AddInput listId={list.id} type="todo"/>
                <div className="card_blank"></div>
            </CustomPaper>
            
        </div>
    )
}

export default Lists
