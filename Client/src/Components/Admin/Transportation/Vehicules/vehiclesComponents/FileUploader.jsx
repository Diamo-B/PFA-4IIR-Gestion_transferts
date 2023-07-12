import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { UilTrashAlt } from "@iconscout/react-unicons";
import { hideImagesPanel } from "../../../../../Redux/Admin/Transportation";
import { useDispatch, useSelector } from "react-redux";

function FileUploader() {
  const { setValue, getValues } = useFormContext();
  let dispatch = useDispatch();
  let fileInputRef;
  
  const handleButtonClick = () => {
    fileInputRef.click();
  };
  

  let {state} = useSelector(state => state.transportation.vehicules.imagesPanels.create);
  useEffect(() => {
    if(state){
      if(getValues("photos")?.length > 0){
        setFiles(getValues("photos"));
      }
    }
  }, [state])
  
  let [files, setFiles] = useState([]);


  const handleFileChange = (e) => {
    setFiles((prev) => [...prev, ...e.target.files]);
  };

  const removeFile = (fileToRemove) => {
    setFiles((prev) => prev.filter((file) => file !== fileToRemove));
  }

  const clearAll = () => {
    setFiles([]);
  }

  const submitphotos = () => {
    setValue("photos", files);
    dispatch(hideImagesPanel())
  }

  return (
    <div className="absolute z-50 top-0 left-0 w-full h-full bg-slate-500/70 flex justify-center items-center">
      <div className="bg-white w-4/5 h-5/6 p-5 rounded-2xl text-slate-700 flex flex-col gap-5">
        <div className="flex justify-center items-center gap-10">
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
            <button onClick={handleButtonClick} className={`btn w-fit px-10 hover:text-white hover:bg-emerald-400 disabled:border-slate-300 disabled:text-slate-300 disabled:hover:bg-transparent disabled:cursor-not-allowed `}
              disabled={files.length >= 10}
            >
                Add Images
            </button>
            <button className="btn w-fit px-7 hover:text-white hover:bg-red-400"
                onClick={clearAll}        
            >
                Clear All Images
            </button>
        </div>
        <div className="flex-1 w-full border-2 border-gray-400 rounded-xl p-5 flex justify-around items-center flex-wrap gap-2 overflow-y-auto no-scrollbar">
            {
                files.length > 0 ?
                files?.map((file, index) => (
                <div key={index}>
                    <div className="border-2 relative rounded-3xl border-slate-500 px-2 flex overflow-hidden w-40 h-40 group hover:cursor-pointer">
                        <img src={URL.createObjectURL(file)} className="w-full h-full object-contain"  />
                        <div className="bg-slate-500/80 rounded-2xl w-full h-full z-40 absolute top-0 left-0 group-hover:flex justify-center items-center hidden"
                            onClick={()=>removeFile(file)}
                        >
                            <UilTrashAlt className="text-red-400 w-16 h-16" />
                        </div>
                    </div>
                </div>
                ))
                :
                <div className="text-xl text-center font-bold text-slate-700">
                  No Images Selected (max: 10 images)
                </div>
            }
        </div>

        <div className="flex justify-center items-center gap-10">
          <button className="btn w-fit px-10 hover:bg-emerald-400 hover:text-white"
            onClick={submitphotos}
          >
            Save
          </button>
          <button className="btn w-fit px-10 hover:bg-red-400 hover:text-white"
            onClick={()=>dispatch(hideImagesPanel())} 
          >
            Hide
          </button>
        </div>
      </div>
    </div>
  );
}

export default FileUploader;
