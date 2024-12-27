import { useSelector } from 'react-redux';
import Contact from './Contact';
import styles from './ContactList.module.css';

const ContactList = ({ onDeleteContact }) => {
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.filters.name.toLowerCase());

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );

  return (
    <div className={styles.contactList}>
      {filteredContacts.map(contact => (
        <Contact
          key={contact.id}
          contact={contact}
          onDelete={() => onDeleteContact(contact.id)}
        />
      ))}
    </div>
  );
};

export default ContactList;
