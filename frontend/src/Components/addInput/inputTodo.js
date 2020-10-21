import { InputBase, Button, IconButton, Paper} from '@material-ui/core'
import React,{useState,useContext} from 'react'
import "./inputTodo.css"
import ClearIcon from '@material-ui/icons/Clear';
import storeAPI from '../../Store/storeAPI';

function InputTodo({setOpen,listId}) {
    const [ctitle, setCtitle] = useState('')
    const {addTodo} = useContext(storeAPI)
    const changeHandeler =(e) =>{
     setCtitle(e.target.value)
    }
    const submitHandeler=()=>{
     addTodo(ctitle,listId)
     setOpen(false)
     setCtitle('')
    }

    const handleDone =() =>{
        setOpen(false)
    }
    return (
        <div className="inputtodo">
            <div  >
            <Paper className="inputTodo_card" >
             <InputBase
                multiline 
                fullWidth
                value={ctitle}
                onBlur={handleDone}
                onChange={changeHandeler}
                inputProps={{
                    className:"inputp"
                        }}
                        autoFocus
                 placeholder="Enter your text here"
            />
                </Paper>
            </div>
            <div className="addButton_div">
                <Button className="addButton" onClick={submitHandeler}> + ADD</Button>
                <IconButton onClick={()=>setOpen(false)}><ClearIcon /></IconButton>
            </div>
            
        </div>
    )
}

export default InputTodo
