import { InputBase, Typography } from '@material-ui/core'
import React,{useState} from 'react'
import {TodoEdit} from '../../../StyledComponents/index'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import "./title.css"

function Title() {
    const [open, setOpen] = useState(false)
    return (
        <div>
            {open ? <div><InputBase value="Todo" inputProps={{
                className: "input"
            }}
                fullWidth
                onBlur={()=> setOpen(!open)}/></div> :
            <div className="Container"> <TodoEdit  className="Container-box" onClick={()=> setOpen(!open)}>Todo</TodoEdit><MoreHorizIcon /></div>
    }
    
            

            
        </div>
    )
}

export default Title
