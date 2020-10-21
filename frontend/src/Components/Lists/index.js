import React from 'react'
import {CssBaseline, Typography} from "@material-ui/core"
import {CustomPaper} from "../../StyledComponents/index"
import Title from './Title'
import "./lists.css"



function Lists() {
    return (
        <div className="lists--header">
            <CustomPaper>
                <CssBaseline />
                <Title className="Paper"/>
            </CustomPaper>
            
        </div>
    )
}

export default Lists
