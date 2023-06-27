import { UilExclamationTriangle } from '@iconscout/react-unicons'
import { useDispatch, useSelector } from 'react-redux';
import { closePanel } from '../../Redux/confirmationPanel';
const ConfirmOp = ({operation_type, Impact, execute}) => {
    let dispatch = useDispatch();
    let {confirmOp} = useSelector(state => state.confirmationPanel);
    return ( 
        <div className="h-full w-full z-50 absolute top-0 left-0 flex justify-center items-center bg-gray-700 bg-opacity-70 text-gray-700 ">
            <div className="mt-5 w-1/2 p-5 bg-white rounded-xl flex flex-col gap-5 justify-center items-center dark:bg-slate-700">
                {Impact=="danger" && <UilExclamationTriangle className="text-red-500"/>}
                <div>
                    <h1 className="text-2xl font-bold text-center mb-2.5">
                        Do you really want to proceed with the operation?
                    </h1>
                    {
                        operation_type &&
                        <h1 className={`text-lg font-bold text-center capitalize ${Impact=="danger" && "text-red-500"}`}>
                            {operation_type}
                        </h1>
                    }
                </div>
                <div className="w-full flex justify-center gap-5">
                    <button className="btn text-lg px-5 hover:text-white hover:bg-emerald-500 "
                        onClick={()=>{
                            if(confirmOp.executeParams)
                                typeof(confirmOp.executeParams)==="Array"?
                                    execute( confirmOp.executeParams.join(','))
                                :
                                    execute(confirmOp.executeParams, dispatch);
                            else
                                execute();
                            dispatch(closePanel());
                        }}
                    >
                        Proceed
                    </button>
                    <button className="btn text-lg px-5 hover:text-white hover:bg-red-500 "
                        onClick={()=>{
                            dispatch(closePanel())
                        }} 
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
 
export default ConfirmOp;