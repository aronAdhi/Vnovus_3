import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import Label from '@mui/icons-material/Label';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {efficiencyUpdate} from './redux/reducer';

let empTree
let setPfle
let dsptch;

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: 'var(--tree-view-color)',
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 'inherit',
      color: 'inherit',
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

function StyledTreeItem(props) {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    ...other
  } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </Box>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

async function profileUpdate(name, dpt, mail, no, emp_id)
{

  let newProfile = {name:name, department:dpt, email:mail, phNo: no}
  console.log("clicked name", name)
  setPfle(newProfile)
  dsptch(efficiencyUpdate({efficiency:-1}))
    await axios.get(`http://vnovushome.in/vnovus/api/employee/employee_tree?emp_id=${emp_id}`).then(response=>{
            console.log("from dashboard",response.data.decision_speed)
            let Efficiency = response.data.decision_speed<100?response.data.decision_speed:100
            dsptch(efficiencyUpdate({efficiency:Efficiency}))
        }).catch(error => {
            console.log(error)
        })

}

export default function GmailTreeView() {

  dsptch = useDispatch()

  empTree = useSelector((state)=>{return state.counter.empTree})
  const [profile, setProfile] = useState({
    name:empTree.emp_details.name,
    department: empTree.emp_details.department,
    email: empTree.emp_details.email,
    phNo: empTree.emp_details.mobile
  })

  setPfle = setProfile

  console.log(empTree)

  let Tree = [],i=0,j=0
  let innerTree = []

  for(i=0;i<empTree.team_tree.length;i++)
  {
    let temp = [];
    for(let j=0;j<empTree.team_tree[i].team_member.length;j++)
    {

    let name = empTree.team_tree[i].team_member[j].name
    let dptmt = empTree.team_tree[i].team_member[j].department
    let mail = empTree.team_tree[i].team_member[j].email
    let mobile = empTree.team_tree[i].team_member[j].mobile
    let emp_id = empTree.team_tree[i].team_member[j].emp_id

      temp.push(
        <StyledTreeItem
          nodeId={String(i)+String(j)}
          labelText={empTree.team_tree[i].team_member[j].name}
          labelIcon={PersonIcon}
          labelInfo=""
          color="#1a73e8"
          bgColor="#e8f0fe"
          onClick = {()=>profileUpdate(name, 
                                        dptmt,
                                      mail,
                                      mobile,emp_id)}
        />
        )
    }

    innerTree.push(temp)
    let name = empTree.team_tree[i].name
    let dptmt = empTree.team_tree[i].department
    let mail = empTree.team_tree[i].email
    let mobile = empTree.team_tree[i].mobile
    let emp_id = empTree.team_tree[i].emp_id
 
    Tree.push( <StyledTreeItem
          nodeId={String(i+1)}
          labelText={empTree.team_tree[i].name}
          labelIcon={PermIdentityIcon}
          onClick = {()=>profileUpdate(name, 
                                        dptmt,
                                      mail,
                                      mobile,emp_id)}
        >

        {innerTree[i]}

         </StyledTreeItem>);
  }

  return (
  <div>
      <div className = "profile"> 
      <p>Name: {profile.name}</p>
      <p>Department: {profile.department}</p>
      <p>email: {profile.email}</p>
      <p>ph no: {profile.phNo}</p>
      </div>

    <TreeView
      aria-label="gmail"
      defaultExpanded={['3']}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      sx={{ height: 264, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >

    <StyledTreeItem
          nodeId={String(100)}
          labelText={"YOU"}
          labelIcon={PersonIcon}
          onClick = {()=>profileUpdate(empTree.emp_details.name, 
                                      empTree.emp_details.department,
                                      empTree.emp_details.email,
                                      empTree.emp_details.mobile,
                                      empTree.emp_details.emp_id)}
        >

                {Tree}

     </StyledTreeItem>           
    </TreeView>

  </div>
  );
}
