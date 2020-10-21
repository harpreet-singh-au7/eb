import { InputBase, Typography } from '@material-ui/core'
import React,{useState} from 'react'
import {TodoEdit} from '../../../StyledComponents/index'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import "./title.css"

function Title({title}) {
    const [open, setOpen] = useState(false)
    return (
        <div>
            {open ? <div><InputBase
                value={title}
                autoFocus
                inputProps={{
                className: "input"
            }}
                fullWidth
                onBlur={() => setOpen(!open)} /></div> :
                <div className="Container"> <TodoEdit className="Container-box" onClick={() => setOpen(!open)}>{title}</TodoEdit><MoreHorizIcon /></div>
            }
    
            

            
        </div>
    )
}

export default Title
