
import { Formik, Field, Form} from "formik";
import * as Yup from "yup";

import useAuthStore from "../Store/authStore";
import { useNavigate } from "react-router-dom";
import Input from "../Components/Input";
import { supabase } from "../Supabase/client";
import { Toaster, toast } from "react-hot-toast";

export default function SignIn() {
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
      <Form className="mx-auto flex w-1/3 flex-col  text-black">

        <div className="mb-8 flex flex-col">
          <Field
            name="first_name"
            component={Input}
            label="First Name"
            type="text"
          />
        </div>

        <div className="mb-8 flex flex-col">
          <Field name="age" component={Input} label="Age" type="number" />
        </div>

        <div className="mb-8 flex flex-col">
          <Field
            className="border border-slate-300"
            name="last_name"
            label="Last Name"
            type="text"
            component={Input}
          />
        </div>
        <div className="mb-8 flex flex-col">
          <Field
            className="border border-slate-300"
            name="username"
            label="User Name"
            type="text"
            component={Input}
          />
        </div>
        <div className="mb-8 flex flex-col">
          <Field
            className="border border-slate-300"
            name="email"
            label="Email"
            type="email"
            component={Input}
          />
        </div>
        <div className="mb-8 flex flex-col">
          <Field
            className="border border-slate-300"
            name="password"
            label="Password"
            type="password"
            component={Input}

          />
        </div>
        <div className="mb-8 flex flex-col">
          <Field
            className="border border-slate-300"
            name="confirm_password"
            label="Confirm Password"
            type="password"
            component={Input}
          />
        </div>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
    </>
  );
}
