import {useDispatch} from 'react-redux';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Chip from '@mui/material/Chip';
import {setMdl} from './redux/reducer';

let dsptch

let openModal = () =>
{
  dsptch(setMdl({showModal:true, modalType:"profile"}))
}

function Menu(props)
{
	let list = props.list
	dsptch = useDispatch()
	let menu = []

	menu.push(<div className = "MenuName">Dcube</div>)
	menu.push(<div className = "innerMenu" onClick = {openModal}>
							<Chip icon={<AccountCircleIcon />} label={list} sx = {{color:"white"}}/>
							</div>)

	return(<div className = "outerMenu">{menu}</div>);
}

export default Menu;