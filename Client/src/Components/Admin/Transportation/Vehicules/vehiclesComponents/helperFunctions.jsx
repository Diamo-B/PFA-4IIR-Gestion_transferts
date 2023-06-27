import { setSelectedVehicles } from "../../../../../Redux/Transportation";
import { activateRefetch } from "../../../../../Redux/Transportation";
import { SetToast } from "../../../../../Redux/toast";
import { closePanel } from '../../../../../Redux/confirmationPanel';

let deleteVehicle = (id, dispatch) => {
  fetch('/api/vehicule/remove', {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`
    },
    body: JSON.stringify({
      id: id
    })
  }).then(async (res) => {
      let response = await res.json();
      dispatch(activateRefetch());
      dispatch(SetToast({
        type: "Success",
        message: `The vehicle ${response.brand + " " + response.sub_Brand} was deleted successfully!!`,
        reload: false
      }));
  }).catch(async (err) => {
    console.log(err);
    let error = await err.json();
    if (error.err) {
      dispatch(SetToast({
        type: "Error",
        message: error.err,
        reload: false
      }));
    }
    console.error(err);
  });
  dispatch(closePanel())
};

let addOrRemoveSelection = (e, id,dispatch,selectedVehicles) => {
  if (e.target.checked)
    dispatch(setSelectedVehicles([id, ...selectedVehicles]));
  else
    dispatch(setSelectedVehicles(selectedVehicles.filter((item) => item !== id)));
};

let addOrRemoveAll = (e, dispatch, vehicles) => {
  if (e.target.checked)
    dispatch(setSelectedVehicles(vehicles.map((item) => item.id)));
  else
    dispatch(setSelectedVehicles([]));
};

export { deleteVehicle, addOrRemoveSelection, addOrRemoveAll };
