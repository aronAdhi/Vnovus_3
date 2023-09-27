import axios from 'axios';
import {useState} from 'react';

function Approvers(props)
{
  console.log(props.query_id)
  const [approvers, setApprovers] = useState([{approver_name: "Loading"}])
  let temp;
 axios.get(`http://vnovushome.in/vnovus/api/approval/get_approval_list/format/json?query_id=${props.query_id}`).then(res => {
            console.log(res.data)
            if (res.data.status) {
                temp = res.data.approvals
                console.log(temp)
            }
        })
  console.log(temp)
  setApprovers(temp)
  let approversList = []
  for(let i=0;i<approvers.length;i++)
  {
  	console.log("called", approvers[i].approver_name)
  	approversList.push(<div className = "approversCard">{approvers[i].approver_name}</div>)
  }

  return(<div>{approversList}</div>)
}

export default Approvers;