import React from 'react'
import {CssBaseline, Typography} from "@material-ui/core"
import {CustomPaper} from "../../StyledComponents/index"
import Title from './Title'
import "./lists.css"
import Card from "../Card"
import AddInput from '../addInput'



function Lists() {
    return (
        <div >
            <CustomPaper className="list_background">
                <CssBaseline />
                <Title  />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <AddInput />
                <div className="card_blank"></div>
            </CustomPaper>
            
        </div>
    )
}

export default Lists
