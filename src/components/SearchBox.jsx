import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../redux/filtersSlice';
import styles from './SearchBox.module.css';

const SearchBox = () => {
  const filter = useSelector(state => state.filters.name);
  const dispatch = useDispatch();

  const handleFilterChange = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div className={styles.searchBox}>
      <label htmlFor="filter">Find contacts by name</label>
      <input
        id="filter"
        type="text"
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default SearchBox;
