import React, {useId, useState} from 'react';
import {Form, Button} from "semantic-ui-react";
import {useFormik} from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {updateNameApi} from "../../../api/user";

export default function ChangeNameForm(props){
    const { user,logout,setReloadUser } = props;
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: initialValues(user.name,user.lastname),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            const response = await updateNameApi(user.id, formData, logout);
            if(!response){
                toast.error("Error al actualizar el nobre y apellidos");
            }else{
                setReloadUser(true);
                console.log("Nombre actualizado");
                toast.success("DATOS ACTUALIZADOS");
            }
            setLoading(false);
        },
    });

    return (
        <div className="change-name-form">
          <h4>Actualiza tu nombre y apellidos.</h4>
          <Form onSubmit={formik.handleSubmit}>
              <Form.Group widths="equal">
                <Form.Input
                 name="name"
                 pattern="^[A-Za-z]+$" 
                 placeholder="Inserta nombre (SOLO LETRAS)" 
                 onChange={formik.handleChange} 
                 value = {formik.values.name} 
                 error={formik.errors.name}
                 />
                <Form.Input 
                name= "lastname" 
                pattern="^[A-Za-z]+$"
                placeholder="Inserta apellido (SOLO LETRAS)" 
                onChange={formik.handleChange} 
                value = {formik.values.lastname} 
                error= {formik.errors.lastname}
                />
              </Form.Group>
              <Button className="submit" loading= {loading} onclick="validar2()">
                  Actualizar
              </Button>
          </Form>
        </div>
    );
}

function initialValues(name, lastname){
    return{
        name: name ||"",
        lastname: lastname||"",
    };
}

function validationSchema(){
    return{
        name: Yup.string().required(true),
        lastname: Yup.string().required(true),
    };
}

function validar2() {
    return{
        name: input.checkValidity(),
        lastname: input.checkValidity(),
    };
  }
