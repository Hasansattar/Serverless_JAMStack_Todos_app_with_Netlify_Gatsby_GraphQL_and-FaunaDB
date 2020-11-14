import React from "react"
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const GET_TODOS=gql`{
  todos{
    id,
    task,
    status
  }

}`;

const ADD_TODOS=gql`
    mutation addTodo($task:String!){
      addTodo(task:$task){
        task
      }
    }

`



export default function Home() {
    let inputText;

  const [addTodo] =useMutation(ADD_TODOS);
   
  const addTask =()=> {
    addTodo({
      variables:{
        task:inputText.value
      },
      refetchQueries:[{query:GET_TODOS}]
    })
    inputText.value="";
  }


  const { loading, error, data}=useQuery(GET_TODOS);
    
  if(loading)
  return <h2>loading...</h2>
  if(error)
  return <h2>error</h2>
  
  
return <div>
           
           <label>
             Add Task <br/>
             <input type="text" ref={node=>{
               inputText =node;
             }} />
           </label>
           <button onClick={addTask}>Add Task</button>
             <br/> <br/>
   
      <h2>heading</h2>

  {JSON.stringify(data.todos)}</div>
}
