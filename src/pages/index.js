import React from "react"
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import './style.css'

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
  
  
return <div className="container">
           
           <label>
              <h3>Add Task</h3>
             <input type="text" ref={node=>{
               inputText =node;
             }} />
           </label>
           <button onClick={addTask}>Add Task</button>
             <br/> <br/>
   
      <h3>My ToDo List</h3>

  {/* {JSON.stringify(data.todos)} */}
  
   <table border="2" width="700">
     <thead>
       <tr>
         <th>ID</th>
         <th>TASK</th>
         <th>STATUS</th>
         </tr>
         </thead>
     <tbody>
       {data.todos.map(todo=>{
         return <tr key={todo.id}>
           <td>{todo.id}</td>
           <td>{todo.task}</td>
           <td>{todo.status.toString()}</td>
         </tr>
       })}
     </tbody>
   </table>
  </div>
}
