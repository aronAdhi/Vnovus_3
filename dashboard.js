import ReactSpeedometer from "react-d3-speedometer"
import {useDispatch, useSelector} from 'react-redux';
import EmpTree from './empTree'

function Dashboard()
{

	let efficiency = useSelector((state)=>{return state.counter.Efficiency})
    let text = "loading"

    if(efficiency == -1)
    {
        efficiency = 0
        text = "loading"
    }
    else
    {
        text = "Efficiency:"+efficiency

    }

	return(   <div>
                    <h1>DASHBOARD</h1>
                                
                    <div className = "speed">
                     <ReactSpeedometer
                        forceRender={true}
                        needleColor = "darkblue"
                        value={parseInt(efficiency)}
                        currentValueText = {text}
                        segments={5}
                        width={300}
                        height={300}
                        maxValue={100}
                        ringWidth={10}
                        />
                        </div>

                    <div className = "empTree"><EmpTree/></div>

                </div>

                        );
}

export default Dashboard;









































