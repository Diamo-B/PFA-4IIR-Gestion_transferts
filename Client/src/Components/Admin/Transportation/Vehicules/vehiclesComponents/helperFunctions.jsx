import { removeVehicle, setSelectedVehicles } from "../../../../../Redux/Admin/Transportation";
import { setToast } from "../../../../../Redux/Gen/toast";
import { closePanel } from '../../../../../Redux/Gen/confirmationPanel';

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
      dispatch(setToast({
        type: "Success",
        message: `The vehicle ${response.brand + " " + response.sub_Brand} was deleted successfully!!`,
        reload: false
      }));
      dispatch(removeVehicle(id));
  }).catch(async (err) => {
    console.log(err);
    let error = await err.json();
    if (error.err) {
      dispatch(setToast({
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
