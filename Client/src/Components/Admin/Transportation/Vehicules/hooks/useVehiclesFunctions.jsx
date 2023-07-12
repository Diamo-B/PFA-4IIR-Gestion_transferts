import { useSelector, useDispatch } from "react-redux";
import {
  addVehicle,
  disableVehicleCreateMode,
  disableVehicleModifyMode,
  hideImagesPanel,
  removeVehicle,
  removeVehicles,
  setSelectedVehicles,
  updateVehicle,
} from "../../../../../Redux/Admin/Transportation";
import { setToast } from "../../../../../Redux/Gen/toast";
import { closePanel } from "../../../../../Redux/Gen/confirmationPanel";

const useVehiclesFunctions = () => {
  let dispatch = useDispatch();

  let { selectedModel, selectedVehicles, updateMode, vehicles } = useSelector(
    (state) => state.transportation.vehicules
  );

  let deleteVehicle = (id) => {
    fetch("/api/vehicule/remove", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then(async (res) => {
        let response = await res.json();
        dispatch(
          setToast({
            type: "Success",
            message: `The vehicle ${
              response.brand + " " + response.sub_Brand
            } was deleted successfully!!`,
            reload: false,
          })
        );
        dispatch(removeVehicle(id));
      })
      .catch(async (err) => {
        console.log(err);
        let error = await err.json();
        if (error.err) {
          dispatch(
            setToast({
              type: "Error",
              message: error.err,
              reload: false,
            })
          );
        }
        console.error(err);
      });
    dispatch(closePanel());
  };

  let createVehicle = (data) => {
    //TODO: Save Data into Database
    console.log(data);
    let imagesNames = [];
    // Instantiate new FormData instance
    const formData = new FormData();

    // Append each image file to the form data
    for (let i = 0; i < data.photos.length; i++) {
      formData.append('images', data.photos[i]); 
      imagesNames.push("/imgs/"+data.photos[i].name);
    }
    
    fetch("/api/vehicule/create", {
      method: "post",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        modelID: selectedModel.value,
        brand: data.BrandCreate,
        brandModel: data.ModelCreate,
        nbr_places: data.PlacesCreate,
        luxe: data.LuxuryCreate,
        images: imagesNames,
      }),
    })
      .then(async (res) => {
        let response = await res.json();
        console.log(response);
        if (response.err)
          dispatch(
            setToast({
              type: "Error",
              message: response.err,
              reload: false,
            })
          );
        else {
          //! Upload images
          fetch("/api/images/upload", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
            body: formData // we are sending formData now instead of JSON string
          }).then((res) => {
            dispatch(
              setToast({
                type: "Success",
                message: `The new vehicle ${
                  response.brand + " " + response.sub_Brand
                } was added successfully!!`,
                reload: false,
              })
            );
            dispatch(addVehicle(response));
          })
          .catch((err) => {      
            setToast({
              type: "Error",
              message: response.err,
              reload: false,
            })
          });
        }
      })
      .catch(async (err) => {
        console.error(err);
        dispatch(
          setToast({
            type: "Error",
            message: "An unknown error occurred while adding the vehicle!!",
            reload: false,
          })
        );
      });
    dispatch(disableVehicleCreateMode());
  };

  let addOrRemoveSelection = (e, id) => {
    if (e.target.checked)
      dispatch(setSelectedVehicles([id, ...selectedVehicles]));
    else
      dispatch(
        setSelectedVehicles(selectedVehicles.filter((item) => item !== id))
      );
  };

  let addOrRemoveAll = (e) => {
    if (e.target.checked)
      dispatch(setSelectedVehicles(vehicles.map((item) => item.id)));
    else dispatch(setSelectedVehicles([]));
  };

  let UpdateVehicle = (data) => {
    fetch("/api/vehicule/update", {
      method: "put",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: updateMode.fieldId,
        brand: data.Brand,
        subBrand: data.Model,
        places: data.Places,
        lux: data.Luxury,
      }),
    })
      .then(async (res) => {
        let response = await res.json();
        if (response.err)
          dispatch(
            setToast({
              type: "Error",
              message: response.err,
              reload: false,
            })
          );
        else {
          dispatch(
            setToast({
              type: "Success",
              message: `The vehicle ${
                response.updatedVehicule.brand +
                " " +
                response.updatedVehicule.sub_Brand
              } was updated successfully!!`,
              reload: false,
            })
          );
          dispatch(updateVehicle(response.updatedVehicule));
        }
      })
      .catch(async (err) => {
        console.error(err);
        dispatch(
          setToast({
            type: "Error",
            message: "An unknown error occurred while updating the vehicle!!",
            reload: false,
          })
        );
      });
    dispatch(disableVehicleModifyMode());
  };

  let changeStatus = (id, Status) => {
    fetch("/api/vehicule/update", {
      method: "put",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        Status: !Status,
      }),
    })
      .then(async (res) => {
        let response = await res.json();
        if (response.err)
          dispatch(
            setToast({
              type: "Error",
              message: response.err,
              reload: false,
            })
          );
        else {
          dispatch(
            setToast({
              type: "Success",
              message: `The vehicle ${
                response.updatedVehicule.brand +
                " " +
                response.updatedVehicule.sub_Brand
              } was ${
                response.updatedVehicule.Status ? "activated" : "disabled"
              } successfully!!`,
              reload: false,
            })
          );
          dispatch(updateVehicle(response.updatedVehicule));
        }
      })
      .catch(async (err) => {
        console.error(err);
        dispatch(
          setToast({
            type: "Error",
            message: "An unknown error occurred while updating the vehicle!!",
            reload: false,
          })
        );
      });
  };

  let deleteSelectedVehicles = () => {
    fetch("/api/vehicule/removeMany", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        Ids: selectedVehicles,
      }),
    })
      .then(async (res) => {
        if (res.ok) {
          dispatch(
            setToast({
              type: "Success",
              message: `The selected vehicles were deleted successfully!!`,
              reload: false,
            })
          );
          dispatch(removeVehicles(selectedVehicles));
        } else {
          throw new Error("Failed to delete selected vehicles");
        }
      })
      .catch(async (error) => {
        console.log(error);
        let err = await error.json();
        if (err.error) {
          dispatch(
            setToast({
              type: "Error",
              message: err.error,
              reload: false,
            })
          );
        }
        console.error(err);
      });
  };

  return {
    deleteSelectedVehicles,
    createVehicle,
    UpdateVehicle,
    changeStatus,
    deleteVehicle,
    addOrRemoveSelection,
    addOrRemoveAll,
  };
};

export default useVehiclesFunctions;
