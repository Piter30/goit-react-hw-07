import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { deleteContact } from '../redux/contactsSlice';
import styles from './ContactList.module.css';
import Contact from './Contact';

// Memoizowany selektor
const selectFilteredContacts = createSelector(
  state => state.contacts.items,
  state => state.filters.name.toLowerCase(),
  (items, filter) =>
    items.filter(contact => contact.name.toLowerCase().includes(filter))
);

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch(); // Zainicjowanie hooka useDispatch

  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

  return (
    <div className={styles.contactList}>
      {filteredContacts.map(contact => (
        <Contact
          key={contact.id}
          contact={contact}
          onDelete={() => handleDelete(contact.id)}
        />
      ))}
    </div>
  );
};

export default ContactList;
