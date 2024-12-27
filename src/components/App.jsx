import ContactForm from './ContactForm';
import SearchBox from './SearchBox';
import ContactList from './ContactList';
import styles from './App.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../redux/contactsSlice';
import { setFilter } from '../redux/filtersSlice';

const App = () => {
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.filters.name);
  const dispatch = useDispatch();

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.appContainer}>
      <h1>Phonebook</h1>
      <ContactForm />{' '}
      {/* Walidacja i dodawanie kontaktów są obsługiwane w ContactForm */}
      <SearchBox
        filter={filter}
        onFilterChange={value => dispatch(setFilter(value))}
      />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

export default App;
