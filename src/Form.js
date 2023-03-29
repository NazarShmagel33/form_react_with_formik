import {Formik, Field, ErrorMessage, Form, useField} from 'formik';
import * as Yup from 'yup';


const MyTextInput=({label,...props}) =>{
    const [field,meta]= useField(props);

    return(
        <>
            <label htmlFor={props.name}>{label}</label>
            <input {...field} {...props} />
            {meta.touched && meta.error ? (<div className='error'>{meta.error}</div>): null}
        </>
    );
};

const MyCheckbox = ({children,...props})=>{
    const [field,meta]=useField({...props,type:'checkbox'});
    return(
        <>
            <label className="checkbox">
                <input type="checkbox" {...field} {...props}/>
                {children}
            </label>
            {meta.touched && meta.error ? (<div className="error">{meta.error}</div>) : null} 
        </>
    );
};

const CustomForm = () => {
    return (
        <Formik
        initialValues={{
            name:'',
            email:'',
            amount:0,
            currency:'',
            text:'',
            terms:false
        }}
        validationSchema = {Yup.object({
            name: Yup.string()
                    .min(2, 'Мінімум 2 символа для заповнення')
                    .required("Обов'язкове поле!"),
            email: Yup.string()
                    .email('Неправильний email адрес')
                    .required("Обов'язкове поле!"),
            amount: Yup.number()
                    .required("Сума обов'язкова")
                    .min(5, 'Не менше 5'),
            currency: Yup.string().required('Виберіть валюту'),
            text: Yup.string()
                    .min(10, 'Не менше 10 символів'),
            terms: Yup.boolean()
                    .required('Необхідне підтвердження')
                    .oneOf([true], "Необхідне підтвердження")
        })}
        onSubmit={values=>console.log(JSON.stringify(values,null,2))}
        >
            <Form className="form">
            <h2>Відправити на благодійність</h2>
            <MyTextInput
                label="Ваше ім'я"
                id="name"
                name="name"
                type="text"
            />
            <MyTextInput
                label="Ваша пошта"
                id="email"
                name="email"
                type="email"
            />
            <label htmlFor="amount">Кількість</label>
            <Field
                id="amount"
                name="amount"
                type="number"
            />
            <ErrorMessage component="div" className="error" name="amount"/>
            <label htmlFor="currency">Валюта</label>
            <Field
                id="currency"
                name="currency"
                as="select"
                >
                    <option value="">Виберіть валюту</option>
                    <option value="USD">USD</option>
                    <option value="UAH">UAH</option>
                    <option value="RUB">EUR</option>
            </Field>
            <ErrorMessage component="div" className="error" name="currency"/>
            <label htmlFor="text">Ваше повідомлення</label>
            <Field 
                id="text"
                name="text"
                as="textarea"
            />
            <ErrorMessage component="div" className="error" name="text"/>
            <MyCheckbox name="terms">
                Погоджуюсь з політикою конфіденційності
            </MyCheckbox>
            <button type="submit">Відправити</button>
        </Form>

        </Formik>
        
    )
}

export default CustomForm;