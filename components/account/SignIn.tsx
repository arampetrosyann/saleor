import { AuthModalContext } from "@/context/authModalContext";
import { useAuth } from "@saleor/sdk";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../Button";
import { Logo } from "../Logo";

export interface SignInFormData {
  email: string;
  password: string;
  keepIn: boolean;
}

export const SignIn: React.VFC = () => {
  const { setModalType } = useContext(AuthModalContext);
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
      keepIn: false,
    },
  });

  const handleSignIn = handleSubmit(async (formData: SignInFormData) => {
    const { data } = await login({
      email: formData.email,
      password: formData.password
    });

    if (data?.tokenCreate?.errors[0]) {
      setError("email", { message: "Please, enter valid credentials" });
    }
  });

  return (
    <div className="flex flex-col items-center max-w-410">
      <div
        style={{ marginTop: 24 }}
        className="w-full flex justify-center items-center"
      >
        <Logo
          className="ml-2 max-sm:w-38"
          containerClass="flex flex-col gap-x-1 items-center"
          link={false}
        >
          <img src="/sit-stand-desk.svg" width="166px" className="max-sm:w-130" alt="Sit Stand Desk" />
        </Logo>
      </div>
      <p className="text-center text-black text-base px-5 mt-2s max-sm:px-3 max-sm:text-xs max-sm:mt-2">
        {"Sign in to view all your profile and save products."}
      </p>
      <form onSubmit={handleSignIn} className="w-full mt-6 text-gray-siv max-sm:mt-3">
        <div className="flex flex-col px-10 max-sm:px-7">
          <div className="w-full mt-5">
            <input
              type="text"
              id="email"
              autoComplete="email"
              className="w-full border-gray-siv text-base active:border-black focus:ring-0 focus:border-black text-black py-7in max-sm:text-xs max-sm:py-3in"
              placeholder="Email address"
              {...register("email", {
                required: "This field is required.",
              })}
            />
            {errors.email && (
              <p className="text-red-blud text-xs">{errors.email.message}</p>
            )}
          </div>

          <div className="w-full mt-5 max-sm:mt-4">
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              className="w-full border-gray-siv text-base active:border-black focus:ring-0 focus:border-black text-black py-7in max-sm:text-xs max-sm:py-3in"
              placeholder="Password"
              {...register("password", {
                required: "This field is required.",
              })}
            />
            {errors.password && (
              <p className="text-red-blud text-xs">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center">
              <input
                className="border-gray-siv active:border-black focus:ring-0 focus:border-black cursor-pointer text-black max-sm:w-3.5 max-sm:h-3.5"
                type="checkbox"
                id="keepIn"
                {...register("keepIn")}
              />
              <p className="text-xs font-normal max-sm:text-9xs" style={{ marginLeft: 6 }}>
                {"Keep me signed in"}
              </p>
            </div>
            <div>
              <p className="text-xs font-normal cursor-pointer max-sm:text-9xs">
                {"Forgot Password?"}
              </p>
            </div>
          </div>

          <div
            className="flex items-center flex-col gap-y-3 mt-9 mb-30 max-sm:mb-20 max-sm:mt-8"
          >
            <Button
              className="w-full max-w-171 border-none border-0 bg-black max-sm:text-xs max-sm:w-134"
              onClick={() => { }}
            >
              {"Sign In"}
            </Button>
            <span className="text-base max-sm:text-xs">
              {"Don’t have an account? "}
              <span
                onClick={() => setModalType("signUp")}
                className="text-red-blud cursor-pointer underline"
              >
                {"Sign Up"}
              </span>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
