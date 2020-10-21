import { InputBase, Button, IconButton, Paper} from '@material-ui/core'
import React from 'react'
import "./inputTodo.css"
import ClearIcon from '@material-ui/icons/Clear';

function InputTodo({setOpen}) {
    return (
        <div className="inputtodo">
            <div  >
            <Paper className="inputTodo_card" >
             <InputBase
                multiline 
                fullWidth
                onBlur={()=>setOpen(false)}
                inputProps={{
                    className:"inputp"
                        }}
                        autoFocus
                 placeholder="Enter your text here"
            />
                </Paper>
            </div>
            <div className="addButton_div">
                <Button className="addButton" onClick={()=>setOpen(false)}> + ADD</Button>
                <IconButton onClick={()=>setOpen(false)}><ClearIcon /></IconButton>
            </div>
            
        </div>
    )
}

export default InputTodo
