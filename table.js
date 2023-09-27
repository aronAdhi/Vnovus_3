import {useDispatch, useSelector} from 'react-redux';
import {setMdl} from './redux/reducer';
import { useState, useEffect } from "react";
import Page from './pagenation'
import Approvers from './approvers'

let dsptch

let handleClick = (i,type)=>
{
  dsptch(setMdl({showModal:true, modalType:type, i:i}))
}

function Table(props)
{
  let data = props.data
  console.log("table data",data)


  dsptch = useDispatch()
  let heading = []
  let from, to
  let dfrom = useSelector((state)=>{return state.counter.decisionFrom})
  let dto = useSelector((state)=>{return state.counter.deciRows}) + dfrom
  let rfrom = useSelector((state)=>{return state.counter.requestFrom})
  let rto = useSelector((state)=>{return state.counter.reqRows}) + rfrom 

  if(data.type == "decisions")
  {
   from = dfrom 
   to = dto
  }
  else
  {
    from = rfrom
    to = rto
  }

  for(let i=0; i<data.heading.length; i++)
  {
    heading.push(<th key={"h"+i} className = {data.heading[i]}>{data.heading[i]}</th>)
  } 
  
  let body = []
  for(let i=from; i<to && i<data.value.length; i++)
  {
    let row = []
    for(let j=0; j<data.value[i].length; j++)
    {
      row.push(<td key = {"c"+i+j} className = {data.heading[j]}>
              <div onClick = {() => handleClick(i,data.type)} > {data.value[i][j]} </div> </td>)
    }
    /*if(data.value[i].length == 4)
    {
      if(i<1)
      {
        console.log("Approvers called")
      row.push(<td><Approvers query_id = {data.value[i][3]}/></td>)
      }
      else
      {
       row.push(<td>Loading</td>) 
      }
    }*/
    body.push(<tr key = {"r"+i}>{row}</tr>)
  }
   return(<div>
            <table className = "content-table">

              <thead className = "head">
                <tr>
                  {heading}
                </tr>
              </thead>

              <div className = "tbody">
                <tbody>
                  {body}
                </tbody>
              </div>

              <tfoot>
                <Page type = {props.data.type} length = {data.value.length}/>
              </tfoot>

            </table>
          </div>)
  }


export default Table;