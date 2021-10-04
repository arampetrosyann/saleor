import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";

interface DisclosureBaseProps {
  title: string,
  content?: string,
  children?:JSX.Element
}

export const DisclosureBase: React.VFC<DisclosureBaseProps> = ({ title, content = "empty",children }) => {

  return (
    <div className="w-full">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button
                className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left font-medium text-base leading-5 text-gray-800 bg-white focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span className={"text-base"}>{title}</span>
                <ChevronUpIcon
                  className={`${
                    open ? "transform rotate-180" : ""
                  } w-5 h-5 text-gray-800`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 box-border pb-2 text-sm text-gray-500">
                {content}
                {children}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
    </div>
  );
};
