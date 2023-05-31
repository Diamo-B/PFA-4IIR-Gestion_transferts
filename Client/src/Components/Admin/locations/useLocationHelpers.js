import { useDispatch, useSelector } from 'react-redux';
import { addSelection, removeSelection, resetSelection } from '../../../Redux/locations';

const useLocationHelpers = () => {
    let dispatcher = useDispatch();
    let {selected} = useSelector(state => state.mapPanel.window);
    let {locations} = useSelector(state=>state.mapPanel.locations);

    const selectOrDeselect = async (id, isChecked) => {
    if (isChecked && !selected.includes(id))
      dispatcher(addSelection(id));
    else
      dispatcher(removeSelection(id));
  };

  const selectOrDeselectAll = async (isChecked) => {
    dispatcher(resetSelection());
    if (isChecked) {
      locations.forEach((location) => {
        dispatcher(addSelection(location.id));
      });
    }
  };

  return {
    selectOrDeselect,
    selectOrDeselectAll,
  };
};

export default useLocationHelpers;
