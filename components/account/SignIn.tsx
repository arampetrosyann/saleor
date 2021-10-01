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
    setValue
  } = useForm({
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
      setError("password", { message: "Please, enter valid credentials" });
    }
  });

  return (
    <div className="flex flex-col items-center">
      <div
        style={{ marginTop: 24 }}
        className="w-full flex justify-center items-center"
      >
        <Logo
          className="ml-2"
          containerClass="flex flex-col gap-x-1 items-center"
          link={false}
        >
          <img src="/sit-stand-desk.svg" width="166px" alt="Sit Stand Desk" />
        </Logo>
      </div>
      <p className="text-center text-black text-base px-5 mt-2 max-500:px-1">
        {"Sign in to view all your profile and save products."}
      </p>
      <form onSubmit={handleSignIn} className="w-full mt-6 text-gray-siv">
        <div className="flex flex-col px-11 max-500:px-3">
          <div className="w-full mt-5">
            <input
              type="text"
              id="email"
              autoComplete="email"
              className="w-full border-gray-siv text-base focus:ring-0 focus:border-black text-black"
              placeholder="Email address"
              {...register("email", {
                required: "This field is required.",
              })}
            />
            {!!errors.email && (
              <p className="text-red-blud text-xs">{errors.email.message}</p>
            )}
          </div>

          <div className="w-full mt-5">
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              className="w-full border-gray-siv text-base focus:ring-0 focus:border-black text-black"
              placeholder="Password"
              {...register("password", {
                required: "This field is required.",
              })}
            />
            {!!errors.password && (
              <p className="text-red-blud text-xs">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center">
              <input
                className="border-gray-siv focus:ring-0 focus:border-black cursor-pointer text-black"
                type="checkbox"
                id="keepIn"
                {...register("keepIn")}
              />
              <p className="text-xs font-normal" style={{ marginLeft: 6 }}>
                {"Keep me signed in"}
              </p>
            </div>
            <div>
              <p className="text-xs font-normal cursor-pointer">
                {"Forgot Password?"}
              </p>
            </div>
          </div>

          <div
            style={{ marginBottom: 30 }}
            className="flex items-center flex-col gap-y-3 mt-9"
          >
            <Button
              className="w-full max-w-171 border-none border-0 bg-black"
              onClick={() => {}}
            >
              {"Sign In"}
            </Button>
            <span className="text-base">
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
