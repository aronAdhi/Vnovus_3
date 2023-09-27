import {useSelector} from 'react-redux';
import Table from './table';

function createData(decisions)
{
  let heading = ["Requester", "Description", "Due Date"]
  let body = []

  for(let i=0; i<decisions.length; i++)
  {
      body.push([decisions[i].emp_name, decisions[i].description, decisions[i].target_date])
  }
  return {heading:heading, value:body, type:"decisions"}
}

function Decisions()
{
  let decisions = useSelector((state)=>{return state.counter.decisions})
  decisions = createData(decisions)

  console.log("decision Table", decisions)

  return (<div><h1>DECISIONS</h1><Table data = {decisions}/></div>);
}

export default Decisions; 
