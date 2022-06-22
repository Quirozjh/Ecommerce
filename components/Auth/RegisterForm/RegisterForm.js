import React, {useState} from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {registerApi} from"../../../api/user";

export default function RegisterForm(props){
     
    const {showLoginForm}= props;
    const [loading, setLoading]= useState(false); 


    const formik = useFormik ({
        initialValues: initialValues(),
        validationSchema:  Yup.object(validationSchema()),
         onSubmit: async (formData) => {
             setLoading(true);
             const response = await  registerApi(formData);

             if (response?.jwt){
                 toast.success("Usuario Registrado");
                showLoginForm();   
             }else{
                 
                 toast.error("Error al registrar el usuario, intentalo después");
             }
             setLoading(false);

         },      
        
    });

    return(
        <Form className="login-form" onSubmit={formik.handleSubmit}>
            <Form.Input 
            name="name" 
            type="text"
            pattern="^[A-Za-z]+$"
            placeholder="Nombre (solo letras)"
            onChange={formik.handleChange}
            error={formik.errors.name}

            />

            <Form.Input
            name="lastname" 
            type="text" 
            pattern="^[A-Za-z]+$"
            placeholder="Apellido (solo letras)" 
            onChange={formik.handleChange}
            error={formik.errors.lastname}
            />

            <Form.Input
            name="username" 
            type="text" 
            placeholder="Nombre de usuario"
            onChange={formik.handleChange}
            error={formik.errors.username}
            />
            <Form.Input 
            name="email" 
            type="text" 
            placeholder="Correo electronico"
            onChange={formik.handleChange}
            error={formik.errors.email}
            />
            <Form.Input 
            name="password" 
            type="password" 
            placeholder="Contraseña"
            onChange={formik.handleChange}
            error={formik.errors.password}
            />



        <div className="actions">
            <Button  type="button" basic onClick={showLoginForm}>
                Iniciar sesión
            </Button>
            <Button type="submit" className="submit" loading={loading} onclick="validar2()">
               Registrar 
            </Button>
        </div>
        </Form>
       
    );
}

function initialValues(){
    return{
      name:"",
      lastname:"",
      username:"",
      email:"",
      password:""  
    };
}

function validationSchema(){
    return{
        name: Yup.string().required("El Nombre es un campo obligatorio."),
        lastname: Yup.string().required("El Apellido es un campo obligatorio."),
        username: Yup.string().required("El Nombre de usuario es un campo obligatorio."),
        email: Yup.string().email(true).required("El Correo electronico es un campo obligatorio."),
        password: Yup.string().required("La Contraseña es un campo obligatorio."),
    };
}

function validar2() {
    return{
        name: input.checkValidity(),
        lastname: input.checkValidity(),
    };
  }
