import styles from './Contact.module.css';
import { FaUser, FaPhone } from 'react-icons/fa';

const Contact = ({ contact, onDelete }) => (
  <div className={styles.contact}>
    <div className={styles.contactInfo}>
      <div className={styles.iconWrapper}>
        <FaUser className={styles.icon} />
        <FaPhone className={styles.icon} />
      </div>
      <div className={styles.contactDetails}>
        <p className={styles.name}>{contact.name}</p>
        <p className={styles.number}>{contact.phone}</p>
      </div>
    </div>
    <button onClick={onDelete} className={styles.deleteButton}>
      Delete
    </button>
  </div>
);

export default Contact;
