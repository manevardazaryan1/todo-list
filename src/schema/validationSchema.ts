import * as Yup from 'yup';
import IValidationSchema from '../Interfaces/IValidationSchema';

const validationSchema: Yup.Schema<IValidationSchema> = Yup.object({
    title: Yup.string()
        .required('Title is required')
        .max(50, 'Title must be 50 characters or less'),
    description: Yup.string()
        .max(500, 'Description must be 500 characters or less'),
    deadline: Yup.string()
    .nullable()
    .transform((value) => (value ? value.trim() : value)),
})

export default validationSchema