
import { Formik, Field, Form} from "formik";
import * as Yup from "yup";
import Button from "../Components/uI/Button";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import Input from "../Components/uI/Input";
import { supabase } from "../supabase/client";
import { Toaster, toast } from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

export default function SignIn() {
  const {t} = useTranslation()
  
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
  const navigate = useNavigate();
  const submit = async ( values) => {
    const form = {
      email: values.email,
      password: values.password,
      confirm_password: values.confirm_password,
      options: {
        data: {
          username: values.username,
          first_name: values.first_name,
          last_name: values.last_name,
        },
      },
    };
    try{
        const {data,error} = await supabase.auth.signUp(form)
        if(error){
          toast.error(error.message)
        }
        if (data.session !== null){
            setLoggedIn(data.session)
            navigate("/profile")
        }
    }catch (error){
      toast.error(error);
    }
}
  
  return (
    <>
    <Helmet>
      <title>Sign In</title>
    </Helmet>
    <Toaster /> 
    <Formik
      initialValues={{
        password: "",
        confirm_password: "",
        email: "",
        username: "",
        first_name: "",
        last_name: "",
        age: "",
      }}
      validationSchema={Yup.object({
        age: Yup.number().required().positive().integer(),
        password: Yup.string().min(3, "Must be 3 characters or more"),
        confirm_password: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Required"),
        first_name: Yup.string()
          .min(3, "Must be 3 characters or more")
          .required("Required"),
        last_name: Yup.string()
          .min(3, "Must be 3 characters or more")
          .required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
      })}
      onSubmit={(values) => submit(values)}
    >
      <Form className="mx-auto min-h-screen flex w-4/5 flex-wrap rounded bg-slate-50 py-20 text-black shadow dark:bg-gray-900 md:w-2/3">
        <h1 className="text-center w-full my-10 text-4xl font-extrabold ">Registrati</h1>
        <div className="mb-8 w-1/2 px-2">
          <Field
            className="border border-slate-300"
            name="username"
            label="User Name"
            type="text"
            component={Input}
          />
        </div>
        <div className="mb-8 w-1/2 px-2">
          <Field name="age" component={Input} label="Age" type="number" />
        </div>
        <div className="mb-8 w-1/2 px-2">
          <Field
            name="first_name"
            component={Input}
            label="First Name"
            type="text"
          />
        </div>
        <div className="mb-8 w-1/2 px-2">
          <Field
            className="border border-slate-300"
            name="last_name"
            label="Last Name"
            type="text"
            component={Input}
          />
        </div>
        
        <div className="mb-8 w-full px-2">
          <Field
            className="border border-slate-300"
            name="email"
            label="Email"
            type="email"
            component={Input}
          />
        </div>
        <div className="mb-8 w-1/2 px-2">
          <Field
            className="border border-slate-300"
            name="password"
            label="Password"
            type="password"
            component={Input}

          />
        </div>
        <div className="mb-8 w-1/2 px-2">
          <Field
            className="border border-slate-300"
            name="confirm_password"
            label="Confirm Password"
            type="password"
            component={Input}
          />
        </div>
        <div className="flex justify-center w-full">
          <Button type="submit" label={"Registrati"} />
        </div>  
      </Form>
    </Formik>
    </>
  );
}
