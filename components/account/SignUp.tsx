import { AuthModalContext } from "@/context/authModalContext";
import { useAuth } from "@saleor/sdk";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../Button";
import { Logo } from "../Logo";

export interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
}

export const SignUp: React.VFC = () => {
  const { setModalType, setOpenModal } = useContext(AuthModalContext);
  const { register: signUp } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues
  } = useForm<SignUpFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agree: false,
    },
  });

  const handleSignUp = handleSubmit(
    async (formData: SignUpFormData) => {
      const { data } = await signUp({
        email: formData.email,
        password: formData.password,
        redirectUrl: `${window.location.host})/`,
      });

      if (data?.accountRegister?.errors.length) {
        data?.accountRegister?.errors.forEach((e) => {
          if (e.field === "email") {
            setError("email", { message: e.message });
          } else if (e.field === "password") {
            setError("password", { message: e.message });
          } else {
            console.error("Registration error:", e);
          }
        });
        return;
      }

      setModalType("");
      setOpenModal(false);
      return null;
    }
  );

  return (
    <div className="flex flex-col items-center max-w-410 w-full">
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
      <p className="text-center text-black text-base px-6 mt-2 tracking-wide leading-5 max-sm:text-xs max-sm:px-6">
        {"Create an account to view all your profile and save products."}
      </p>
      <form onSubmit={handleSignUp} className="w-full mt-6 text-gray-siv max-sm:mt-4">
        <div className="flex flex-col px-10 max-sm:px-7">
          <div className="w-full">
            <input
              type="text"
              id="firstName"
              className="w-full border-gray-siv text-base active:border-black focus:ring-0 focus:border-black text-black py-7in max-sm:text-xs max-sm:py-3in"
              placeholder="First Name"
              {...register("firstName", {
                required: "This field is required.",
              })}
            />
            {!!errors.firstName && (
              <p className="text-red-blud text-xs">{errors.firstName.message}</p>
            )}
          </div>

          <div className="w-full mt-4 max-sm:mt-3">
            <input
              type="text"
              id="lastName"
              className="w-full border-gray-siv text-base active:border-black focus:ring-0 focus:border-black text-black py-7in max-sm:text-xs max-sm:py-3in"
              placeholder="Last Name"
              {...register("lastName", {
                required: "This field is required.",
              })}
            />
            {!!errors.lastName && (
              <p className="text-red-blud text-xs">{errors.lastName.message}</p>
            )}
          </div>

          <div className="w-full mt-4 max-sm:mt-3">
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
            {!!errors.email && (
              <p className="text-red-blud text-xs">{errors.email.message}</p>
            )}
          </div>

          <div className="w-full mt-4 max-sm:mt-3">
            <input
              type="password"
              id="password"
              autoComplete="new-password"
              className="w-full border-gray-siv text-base active:border-black focus:ring-0 focus:border-black text-black py-7in max-sm:text-xs max-sm:py-3in"
              placeholder="Password"
              {...register("password", {
                required: "This field is required.",
              })}
            />
            {!!errors.password && (
              <p className="text-red-blud text-xs">{errors.password.message}</p>
            )}
          </div>

          <div className="w-full mt-4 max-sm:mt-3">
            <input
              type="password"
              id="confirmPassword"
              autoComplete="confirm-password"
              className="w-full border-gray-siv text-base active:border-black focus:ring-0 focus:border-black text-black py-7in max-sm:text-xs max-sm:py-3in"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "This field is required.",
                validate: (value: string) => {
                  const password = getValues("password");

                  return password === value || "Passwords must match!";
                }
              })}
            />
            {!!errors.confirmPassword && (
              <p className="text-red-blud text-xs">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="flex items-center mt-7 max-sm:mt-6">
            <div className="flex items-center">
              <input
                className="border-gray-siv focus:ring-0 focus:border-black cursor-pointer text-black max-sm:w-3.5 max-sm:h-3.5"
                type="checkbox"
                id="agree"
                {...register("agree", {
                  validate: (value: boolean) => value
                })}
              />
            </div>
            <p className="text-xs font-normal max-sm:text-9xs" style={{ marginLeft: 6 }}>
              <span>{"By creating account, you agree to all "}</span>
              <span className="underline">{"Terms of Use."}</span>
            </p>
          </div>

          <div
            style={{ marginBottom: 15 }}
            className="flex items-center flex-col gap-y-3 mt-9 max-sm:mt-8"
          >
            <Button
              className="w-full max-w-171 border-none border-0 bg-black max-sm:text-xs max-sm:w-134"
              onClick={() => { }}
            >
              {"Sign Up"}
            </Button>
            <span className="text-base max-sm:text-xs">
              {"Already have an account? "}
              <span
                onClick={() => setModalType("signIn")}
                className="text-red-blud cursor-pointer underline"
              >
                {"Sign In"}
              </span>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
