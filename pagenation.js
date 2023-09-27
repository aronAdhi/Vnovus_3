import {useDispatch, useSelector} from 'react-redux';
import { useState, useEffect } from "react";
import * as React from 'react';
import axios from 'axios';
import TablePagination from '@mui/material/TablePagination';
import {decisionUpdate, requestUpdate, approverUpdate} from './redux/reducer';


let dsptch;
let approvers;
let request
let dfrom 
let drows
let rfrom
let rrows

async function loadData(payload)
{
  let old_approvers = [...approvers]
      for(let i=payload.from;(i<(payload.from + drows)) && i<request.length;i++)
        {
          console.log(typeof(request[i].query_id))
           await axios.get(`http://vnovushome.in/vnovus/api/approval/get_approval_list/format/json?query_id=${request[i].query_id}`).then(res => {
            console.log(request[i].query_id)
            if (res.data.status) {
                console.log(res.data.approvals)
                old_approvers.push(res.data.approvals)
            }
        })
        }
        dsptch(approverUpdate({newApprovers: old_approvers}))
      console.log("new approvers must be loaded")
}

function Pagenation(props)
{
  approvers = useSelector((state)=>{return state.counter.Approvers})
  request = useSelector((state)=>{return state.counter.request})
  const [data,setData] = useState(props.type)

  dsptch = useDispatch()
  dfrom = useSelector((state)=>{return state.counter.decisionFrom})
  drows = useSelector((state)=>{return state.counter.deciRows})
  rfrom = useSelector((state)=>{return state.counter.requestFrom})
  rrows = useSelector((state)=>{return state.counter.reqRows}) 
  let rowspp 
  if(props.type == "decisions")
  {
  	rowspp = 15
  }	
  else
  {
  	rowspp = 5
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(rowspp);
  const count = props.length

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    let payload = {from: 0, rows: 1}
    payload.from = rowsPerPage*(newPage)

    if(props.type !== "decisions" && approvers.length <= payload.from)
    {
      loadData(payload)
    }

    console.log('payload',payload)

    if(props.type == "decisions")
      {
        console.log("decision pagenation called")
        payload.rows = drows
        dsptch(decisionUpdate(payload))
      } 
    else
      {
       console.log("request pagenation called")
        payload.rows = rrows
        dsptch(requestUpdate(payload))
      }
  };

  const handleChangeRowsPerPage = (event) => {

    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);

    let payload = {rows: parseInt(event.target.value, 10) }

    payload.rows = parseInt(event.target.value, 10)
    console.log('payload',payload)

    if(props.type == "decisions")
      {
        console.log("decision pagenation called")
        payload.from = dfrom
        dsptch(decisionUpdate(payload))
      } 
    else
      {
        console.log("request pagenation called")
        payload.from = rfrom
        dsptch(requestUpdate(payload))
      }

  };

  return (
    <TablePagination
      component="div"
      count={count}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPageOptions = {[5,15,20]}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}

export default Pagenation;