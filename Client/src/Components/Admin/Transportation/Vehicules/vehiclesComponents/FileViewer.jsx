import { useSelector,useDispatch } from "react-redux";
import { hideImagesUpdatingPanel, hideImagesViewingPanel, removeImageUpdatingPanel } from "../../../../../Redux/Admin/Transportation";
import { UilTrashAlt, UilSadDizzy } from '@iconscout/react-unicons'
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
const FileViewer = () => {
    let dispatch = useDispatch();   
    let {view, update} = useSelector((state) => state.transportation.vehicules.imagesPanels);
    let {setValue} = useFormContext();

    //**********Add new
    let [files, setFiles] = useState([]);
    let fileInputRef;

    const handleButtonClick = () => {
        fileInputRef.click();
      };

  const handleFileChange = (e) => {
    setFiles((prev) => [...prev, ...e.target.files]);
  };
  //************

    useEffect(() => {
        if(update.state == true)
            setValue("oldImages", update.vehicle.images.map(img => {return {path: img.path, status: "old"}}))
    }, [update])
    
    let removeImage = (path) => () => {
        dispatch(removeImageUpdatingPanel(path))
        setValue("oldImages", update.vehicle.images.map(img => {return {path: img.path, status: "old"}}))
    }

    let saveTheNewImages = () => {
        if(update.state == true)
        {
            setValue("oldImages", update.vehicle.images.map(img => {return {path: img.path, status: "old"}}))
            dispatch(hideImagesUpdatingPanel())
        }
    }
    
    return ( 
        <div className="absolute z-50 top-0 left-0 w-full h-full bg-slate-500/70 flex justify-center items-center">
            <div className="bg-white w-4/5 h-5/6 p-5 rounded-2xl text-slate-700 flex flex-col gap-5 items-center">
                {
                    update.state &&
                    <div className="flex gap-10">
                        <input
                            type="file"
                            accept="image/*"
                            multiple={true}
                            className="hidden"
                            ref={(e) => {
                            fileInputRef = e;
                            }}
                            onChange={handleFileChange}
                        />
                        <button className="btn w-fit px-10 hover:text-white hover:bg-emerald-400"
                            onClick={handleButtonClick}
                        >
                            Add Image
                        </button>
                        <button className="btn w-fit px-10 hover:text-white hover:bg-red-400">
                            Clear All
                        </button>
                    </div>
                }
                <div className="flex-1 w-full border-2 border-gray-400 rounded-xl p-5 flex justify-around items-center flex-wrap gap-2 overflow-y-auto no-scrollbar">
                    {
                         (view?.vehicle?.images || update?.vehicle?.images)?.length > 0 ?
                        (view?.vehicle?.images || update?.vehicle?.images)?.map((img, index) => (
                            <div key={index}>
                                <div className="border-2 relative rounded-3xl border-slate-500 px-2 flex overflow-hidden w-40 h-40 group hover:cursor-pointer hover:shadow-md">
                                    <img src={`${img.path}`} className="w-full h-full object-contain" 
                                        onClick={() => window.open(`${img.path}`,"_blank")}
                                    />
                                    {
                                        update.state &&
                                        <div className="bg-slate-500/80 rounded-2xl w-full h-full z-40 absolute top-0 left-0 group-hover:flex justify-center items-center hidden"
                                            onClick={removeImage(img.path)}
                                        >
                                            <UilTrashAlt className="text-red-400 w-16 h-16" />
                                        </div>
                                        
                                    }
                                    
                                </div>
                            </div>
                        ))
                        :
                            <div className="text-xl text-center font-bold text-slate-700 capitalize flex flex-col items-center gap-5 -mt-10">
                                <UilSadDizzy className="w-16 h-16" />
                                <p>This vehicle has no images</p>
                            </div>
                    }
                </div>
                <div className="flex justify-center gap-20">
                    {
                        update.state &&
                        <button className="btn w-fit px-10 hover:text-white hover:bg-emerald-400"
                            onClick={saveTheNewImages}
                        >
                            Save
                        </button>
                    }
                    <button className="btn w-fit px-10 hover:text-white hover:bg-red-400"
                        onClick={()=> {
                            view.state && dispatch(hideImagesViewingPanel())
                            update.state && dispatch(hideImagesUpdatingPanel())
                        }}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
 
export default FileViewer;