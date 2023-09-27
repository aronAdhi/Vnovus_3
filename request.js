import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import Table from './table';
import {approverUpdate} from './redux/reducer';
import axios from 'axios';

let approvers = []
let dsptch
let requestTo, requestFrom
let request

function createData(requests)
{
  let heading = ["Title", "Description", "Target date","Approvers"]
  let body = []
  
  for(let i=0; i<requests.length; i++)
  {
      let approver = []

      if(i<approvers.length)
      {
       for(let j=0;j<approvers[i].length;j++)
       {
         let design = {backgroundColor: 'rgba(0,0,255,.3)',border: '1px solid blue'}
         if(approvers[i][j].type == 'Original')
         {
          if(approvers[i][j].status == "Approved")
                design = {backgroundColor: 'rgba(0,255,0,.3)',border: '1px solid green'}
          if(approvers[i][j].status == "Transferred")
                design = {backgroundColor: 'rgba(255,255,0,.3)',border: '1px solid orange'} 
          if(approvers[i][j].status == "Rejected")
                design = {backgroundColor: 'rgba(255,0,0,.3)',border: '1px solid red'} 
          if(approvers[i][j].approver_name.length >= 7)
                design.fontSize = '.7em'    

          approver.push(<div className = "approversCard" style={design}>
                        <b>{approvers[i][j].approver_name}</b>
                        <br/>
                        {approvers[i][j].status}
                        </div>)
         }
       }
      }
      else
      {
        approver = "Loading"
      }

      body.push([requests[i].title, requests[i].description, 
                requests[i].request_date, approver])
  }

  return {heading:heading, value:body, type:"requests"}
}

function Requests()
{
  request = useSelector((state)=>{return state.counter.request})
  approvers = useSelector((state)=>{return state.counter.Approvers})
  requestFrom = useSelector((state)=>{return state.counter.requestFrom})
  requestTo = useSelector((state)=>{return state.counter.reqRows}) + requestFrom

  dsptch = useDispatch()

  let requestTable = createData(request)

  console.log("request Table", request)

  return (<div><h1>REQUESTS</h1><Table data = {requestTable}/></div>);
}

export default Requests; 



































