import { useState } from "react";
import { useFormik, type FormikHelpers } from "formik";
import * as Yup from "yup";
import logo from "@/assets/images/logo.png";
import authImage from "@/assets/images/authImage.png";
import type { SignInFormValues } from "@/types";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "@/utils/constants";


const SignIn: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate()

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik<SignInFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (
      values: SignInFormValues,
      { setSubmitting }: FormikHelpers<SignInFormValues>
    ) => {
      console.log("Form submitted:", values);
      navigate(PRIVATE_PATHS.USERS)
      setTimeout(() => {
        setSubmitting(false);
      }, 1000);
    },
  });

  return (
    <section className="flex min-h-screen w-full">
      {/* left section */}
      <div className="hidden lg:flex lg:w-1/2  bg-[#FCFCFC] items-center justify-center px-8 xl:px-16">
        <div className="max-w-[600px] w-full">
          <img
            src={logo}
            alt="Lendsqr logo"
            className="mb-12 xl:mb-40 h-7 xl:h-8"
          />
          <img
            src={authImage}
            alt="Authentication illustration"
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* right section */}
      <div className="w-full lg:w-1/2 xl:w-[45%] flex items-center justify-center px-6 sm:px-10 md:px-16 lg:px-12 xl:px-20 bg-white">
        <div className="w-full max-w-[447px]">
          {/* Mobile logo */}
          <img src={logo} alt="Lendsqr logo" className="lg:hidden mb-12 h-7" />

          <div className="mb-12 lg:mb-14 xl:mb-16">
            <h1 className="text-[#213F7D] text-[32px] sm:text-[36px] lg:text-[40px] font-bold mb-2 lg:mb-3 leading-tight">
              Welcome!
            </h1>
            <p className="text-[#545F7D] text-lg sm:text-xl font-light">
              Enter details to login.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Email input */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-5 py-4 border rounded-lg text-[#545F7D] text-sm placeholder:text-[#545F7D] placeholder:text-sm focus:outline-none focus:border-[#39CDCC] transition-colors ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-[#D4D4D4]"
                }`}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1.5 text-red-500 text-xs">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Password input */}
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-5 py-4 border rounded-lg text-[#545F7D] text-sm placeholder:text-[#545F7D] placeholder:text-sm focus:outline-none focus:border-[#39CDCC] transition-colors pr-16 ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-500"
                      : "border-[#D4D4D4]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-[#39CDCC] text-xs font-semibold uppercase tracking-wide hover:text-[#2eb8b7] transition-colors"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="mt-1.5 text-red-500 text-xs">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* Forgot password link */}
            <div>
              <a
                href="#"
                className="text-[#39CDCC] text-xs font-medium uppercase tracking-wide hover:text-[#2eb8b7] transition-colors inline-block"
              >
                input any valid email and password, then click on login
              </a>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full bg-[#39CDCC] text-white text-sm font-semibold py-4 rounded-lg hover:bg-[#2eb8b7] transition-colors uppercase tracking-wider shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {formik.isSubmitting ? "Logging in..." : "Log In"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
