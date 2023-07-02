import { useDispatch, useSelector } from "react-redux";
import { SetToast } from "../../../../Redux/toast";
import { addExtra, deleteExtra, updateExtra, addToSelectedExtras, removeFromSelectedExtras, resetSelectedExtras, setSelectedExtras, deleteExtras  } from "../../../../Redux/extras";

const useExtrasManipulation = () => {
    let dispatch = useDispatch();
    let { extrasToShow, selectedExtras } = useSelector((state) => state.extras);
    
    const createExtra = (data, type) => {
        fetch("/api/extra/types/getByLabel/"+type,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        }).then(async res=>{
            let response = await res.json();
            if(res.ok && res.status === 200)
            {
                fetch("/api/extra/create",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwt")}`
                    },
                    body:JSON.stringify({
                        label:data.label,
                        price:data.price,
                        params:data.params,
                        extraTypeId:response.id
                    })
                }).then(async res=>{
                    let response = await res.json();
                    if(res.ok)
                    {
                        dispatch(addExtra(response))
                        dispatch(SetToast({
                            type: "Success",
                            message: `The Extra {${response.label}} was created successfully !!`,
                            reload: false
                        }))
                    }
                    else if(response.message)
                    {
                        dispatch(SetToast({
                            type: "Error",
                            message: response.message,
                            reload: false
                        }))
                    }
                })
                .catch(err=>{
                    console.log(err);
                    dispatch(SetToast({
                        type: "Error",
                        message: "An Unknown Error Occured !!",
                        reload: false
                    }))
                })
            }
            else
            {
                dispatch(SetToast({
                    type: "Error",
                    message: response.message,
                    reload: false
                })) 
            }
        })
        .catch(err=>{
            dispatch(SetToast({
                type: "Error",
                message: `An Unknown Error Occured !!`,
                reload: false
            }))
        })
    }

    const toggleExtraStatus = (id,CurrentState) => {
        fetch("/api/extra/update",{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            },
            body:JSON.stringify({
                id,
                active: !CurrentState
            })
        }).then(async res=>{
            let response = await res.json();
            if(res.ok && res.status === 200)
            {
                dispatch(updateExtra(response))
                dispatch(SetToast({
                    type: "Info",
                    message: `The Extra {${response.label}} was ${response.active ? "Activated" : "Disabled"} successfully !!`,
                    reload: false
                }))
            }
            else
            {
                dispatch(SetToast({
                    type: "Error",
                    message: response.message,
                    reload: false
                })) 
            }
        })
        .catch(err=>{
            console.log(err)
            dispatch(SetToast({
                type: "Error",
                message: `An Unknown Error Occured !!`,
                reload: false
            }))
        })
    };

    const deleteSingleExtra = (id) => {
        fetch("/api/extra/remove",{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            },
            body:JSON.stringify({
                id
            })
        }).then(async res=>{
            let response = await res.json();
            if(res.ok && res.status === 200)
            {
                dispatch(deleteExtra(response.id))
                dispatch(SetToast({
                    type: "Info",
                    message: `The Extra {${response.label}} was deleted successfully !!`,
                    reload: false
                }))
            }
            else
            {
                dispatch(SetToast({
                    type: "Error",
                    message: response.message,
                    reload: false
                })) 
            }
        })
        .catch(err=>{
            console.log(err)
            dispatch(SetToast({
                type: "Error",
                message: `An Unknown Error Occured !!`,
                reload: false
            }))
        })
    }

    const deleteSelectedExtras = () => {
        fetch("/api/extra/removeMany",{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            },
            body:JSON.stringify({
                ids:selectedExtras
            })
        }).then(async res=>{
            if(res.ok && res.status === 200)
            {
                dispatch(deleteExtras(selectedExtras))
                dispatch(SetToast({
                    type: "Success",
                    message: `The Selected Extras were deleted successfully !!`,
                    reload: false    
                }))
            }
            else if(res.status === 400)
            {
                let response = await res.json();
                dispatch(SetToast({
                    type: "Error",
                    message: response.message,
                    reload: false
                }))
            }
        }).catch(err=>{
            console.log(err)
            dispatch(SetToast({
                type: "Error",
                message: `An Unknown Error Occured !!`,
                reload: false
            }))
        });
    }

    let selectOrDeselectAll = (e) => {
        if(!e.target.checked)
          dispatch(resetSelectedExtras())
        else
          dispatch(setSelectedExtras(extrasToShow.map((extra) => extra.id)))
      }
    
    let selectOrDeselectExtra = (e, id) => {
        if(e.target.checked)
        {
            if(!selectedExtras.includes(id))
            dispatch(addToSelectedExtras(id))
        }
        else
        {
            if(selectedExtras.includes(id))
            dispatch(removeFromSelectedExtras(id))
        }
    }
    return {createExtra, toggleExtraStatus, deleteSingleExtra, deleteSelectedExtras, selectOrDeselectAll, selectOrDeselectExtra}
    
}

export default useExtrasManipulation;