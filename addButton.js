import * as MUI from '@mui/material';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import {useDispatch, useSelector} from 'react-redux';
import {setMdl} from './redux/reducer';

let dsptch

function handleAdd()
{
	console.log("add button clicked ")
	dsptch(setMdl({showModal:true, modalType:'add'}))
}

function AddButton()
{
   dsptch = useDispatch()
   return(<div      className = 'AddButton'
   					onClick = {handleAdd}>
                    {<AddIcon sx = {{color:"white"}}/>}
                    </div>)
}

export default AddButton;