import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchContacts,
  addContact,
  deleteContact,
} from '../redux/contactsSlice';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import SearchBox from './SearchBox';
import styles from './App.module.css';

const App = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(state => state.contacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = contact => {
    dispatch(addContact(contact));
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <div className={styles.appContainer}>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} />
      <SearchBox />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ContactList contacts={items} onDeleteContact={handleDeleteContact} />
    </div>
  );
};

export default App;
