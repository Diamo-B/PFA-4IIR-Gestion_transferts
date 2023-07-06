import { useDispatch, useSelector } from 'react-redux';
import { addSelection, removeSelection, resetSelection } from '../../../Redux/Admin/locations';

const useLocationHelpers = () => {
  let dispatcher = useDispatch();
  let {selected} = useSelector(state => state.mapPanel.window);
  let {locations} = useSelector(state=>state.mapPanel.locations);
  let { paths } = useSelector((state) => state.mapPanel.paths);

  const selectOrDeselect = async (id, isChecked) => {
    if (isChecked && !selected.includes(id))
      dispatcher(addSelection(id));
    else
      dispatcher(removeSelection(id));
  };

  const selectOrDeselectAllLocations = async (isChecked) => {
    dispatcher(resetSelection());
    if (isChecked) {
      locations.forEach((location) => {
        dispatcher(addSelection(location.id));
      });
    }
  };

  const selectOrDeselectAllPaths = async (isChecked) => {
    dispatcher(resetSelection());
    if (isChecked) {
      paths.forEach((path) => {
        dispatcher(addSelection(path.id));
      });
    }
  };

  return {
    selectOrDeselect,
    selectOrDeselectAllLocations,
    selectOrDeselectAllPaths
  };
};

export default useLocationHelpers;
