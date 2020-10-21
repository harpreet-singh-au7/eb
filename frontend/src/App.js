import React,{useState} from 'react';
import Lists from "./Components/Lists"
import storeData from "./Store"
import StoreAPI from "./Store/storeAPI"

import './App.css';
import InputTodo from './Components/addInput/inputTodo';

function App() {
const [data, setData] = useState(storeData)
const addTodo = (title,listId) => {
  const newTodoId =Math.random()*1009
  const newTodo= {
    id:newTodoId,
    title,
  }
  const list =data.lists[listId]
  list.cards=[...list.cards,newTodo]

  const newState ={
    ...data,
    lists:{
      ...data.lists,
      [listId]:list
    }
  }
  setData(newState)
}

const addTodoList = (title) =>{
  const newTodoListID=Math.random()*807
  const newList={
    cards:[],
    id:newTodoListID,
    title,
  }
  const newState={
    Ids:[...data.Ids,newTodoListID],
    lists:{
       ...data.lists,
       [newTodoListID]:newList
    }
  }
  setData(newState)
}

const updateTitle = (title,listId) =>{
  const list =data.lists[listId]
  list.title = title;

  const newState = {
    ...data,
    lists:{
      ...data.lists,
      [listId]:list
    }
  }
  setData(newState)
}
  return (
    <StoreAPI.Provider value={{addTodo, addTodoList,updateTitle}}>
    <div className="App_todo">
      {data.Ids.map((id)=>{
        const l = data.lists[id];
        return <Lists list={l} key={id}/>
      })}
      <InputTodo type="list"/>
 
    </div>
    </StoreAPI.Provider>
  );
}

export default App;
