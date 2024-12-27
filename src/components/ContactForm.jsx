import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './ContactForm.module.css';

const ContactForm = ({ onAddContact }) => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[A-Za-z\s]+$/, 'Imię może zawierać tylko litery i spacje')
      .min(3, 'Za krótkie!')
      .max(50, 'Za długie!')
      .required('Imię jest wymagane'),
    phone: Yup.string()
      .matches(/^[0-9]+$/, 'Numer telefonu może zawierać tylko cyfry')
      .min(6, 'Numer telefonu jest za krótki')
      .max(20, 'Numer telefonu jest za długi')
      .required('Numer telefonu jest wymagany'),
  });

  const handleSubmit = (values, { resetForm }) => {
    onAddContact(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', phone: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
        <label htmlFor="name">Name</label>
        <Field name="name" type="text" />
        <ErrorMessage name="name" component="div" className={styles.error} />

        <label htmlFor="phone">Phone</label>
        <Field name="phone" type="text" />
        <ErrorMessage name="phone" component="div" className={styles.error} />

        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
