import React from "react";

export type AuthModalContextType = {
  modalType: string;
  setModalType: React.Dispatch<string>;
  openModal: boolean;
  setOpenModal: React.Dispatch<boolean>;
};

const defaultValues: AuthModalContextType = {
  modalType: "signIn",
  setModalType: () => {},
  openModal: false,
  setOpenModal: () => {},
};

export const AuthModalContext = React.createContext<AuthModalContextType>(defaultValues);