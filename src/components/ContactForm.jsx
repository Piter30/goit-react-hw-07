import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from '../redux/contactsSlice';
import { nanoid } from 'nanoid';
import styles from './ContactForm.module.css';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items); // Pobieramy istniejące kontakty

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[A-Za-z\s]+$/, 'Imię może zawierać tylko litery i spacje')
      .min(3, 'Za krótkie!')
      .max(50, 'Za długie!')
      .required('Imię jest wymagane'),
    number: Yup.string()
      .matches(/^[0-9]+$/, 'Numer telefonu może zawierać tylko cyfry')
      .min(6, 'Numer telefonu jest za krótki')
      .max(20, 'Numer telefonu jest za długi')
      .required('Numer telefonu jest wymagany'),
  });

  const handleSubmit = (values, { resetForm }) => {
    const normalizedName = values.name.toLowerCase();

    // Sprawdzenie, czy kontakt już istnieje
    const isDuplicate = contacts.some(
      contact =>
        contact.name.toLowerCase() === normalizedName ||
        contact.number === values.number
    );

    if (isDuplicate) {
      alert('Kontakt o podanym imieniu lub numerze już istnieje!');
      return;
    }

    // Dodanie kontaktu, jeśli nie jest duplikatem
    const contact = { id: nanoid(), ...values };
    dispatch(addContact(contact));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
        <label htmlFor="name">Name</label>
        <Field name="name" type="text" />
        <ErrorMessage name="name" component="div" className={styles.error} />

        <label htmlFor="number">Number</label>
        <Field name="number" type="text" />
        <ErrorMessage name="number" component="div" className={styles.error} />

        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
