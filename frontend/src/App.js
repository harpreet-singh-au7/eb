import React,{useState} from 'react';
import Lists from "./Components/Lists"
import storeData from "./Store"
import StoreAPI from "./Store/storeAPI"

import './App.css';

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
  return (
    <StoreAPI.Provider value={{addTodo}}>
    <div className="App">
      {data.Ids.map((id)=>{
        const l = data.lists[id];
        return <Lists list={l} key={id}/>
      })}
 
    </div>
    </StoreAPI.Provider>
  );
}

export default App;
