import axios from 'axios';
import Table from './components/table';

import {useDispatch, useSelector} from 'react-redux';
import {login} from './redux/reducer';

import Card from './loginPage/loginCard';
import Menu from './menu'
import Banner from './loginPage/banner';
import Decisions from './decisions'
import Requests from './request'
import Alert from './loginPage/alert'
import Dasboard from './dashboard'
import MyModal from './modal/modal'
import AddButton from './addButton'


import './Style/app.css'

function App()
{
   let isloggedIn = useSelector((state)=>{return state.counter.loggedIn})
   let showAlert = useSelector((state)=>{return state.counter.showLoginAlert})

   let screen = (<div>WELCOME TO VNOVUS</div>)

   let empName = useSelector((state)=>{return state.counter.empDetails.name}) 

   if(!isloggedIn)
   {
        if(showAlert)
        {
            screen = (<div> 
                <Banner/> 
                <Card/> 
                <Alert/>
            </div>)
        }
        else
        {
        screen = (<div> 
                <Banner/> 
                <Card/> 
            </div>) 
        }
   } 

   else
   {
    screen = (<div className = "homePage">

               <AddButton/>

               <div className = 'menu'><Menu list = {empName}/></div>

                <div className = "decisions"><Decisions/></div>

                <div className = "dashboard"><Dasboard/></div>
                
                <div className = "requests"><Requests/></div>

                <MyModal/>

            </div>)
   }

    return(<div>{screen}</div>)
}

export default App;
