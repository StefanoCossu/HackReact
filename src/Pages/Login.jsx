import Input from "../Components/uI/Input";
import { supabase } from "../supabase/client";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Button from "../Components/uI/Button";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

export default function Login() {
  const {t} = useTranslation()
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);

  const navigate = useNavigate();

  const submit = async (values) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      console.log(data, error);
      if (error) throw error;

      if (data.session !== null) {
        setLoggedIn(data.session);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <Helmet>
      <title>Login</title>
    </Helmet>
    <div className="min-h-screen pt-24">
      <Formik
        initialValues={{
          password: "",
          email: "",
        }}
        validationSchema={Yup.object({
          password: Yup.string().min(3, "Must be 3 characters or more"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
        })}
        onSubmit={(values) => submit(values)}
      >
        <Form className="mx-auto flex w-4/5 flex-wrap rounded bg-slate-50 py-8 text-black shadow dark:bg-gray-900 md:w-1/3">
          <div className="w-full text-center">
            <h1 className="text-4xl font-bold text-black dark:text-white">
              Login
            </h1>
          </div>
          <div className="mb-8 w-full px-2">
            <Field name="email" component={Input} label="Email" type="email" />
          </div>

          <div className="mb-8 w-full px-2">
            <Field
              name="password"
              component={Input}
              label="Password"
              type="password"
            />
          </div>

          <div className="w-full text-center myTextBox">
            <Button type="submit" label="Login now" />
          </div>
        </Form>
      </Formik>
      <Link to="/sign-in" className="mx-auto mt-12 block text-center text-xl">
        Oppure Registrati
      </Link>
    </div>
    </>
  );
}
