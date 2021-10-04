import { ProductDetailsFragment } from "@/saleor/api";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpIcon, SelectorIcon } from "@heroicons/react/solid";
import { ColorSelect } from "@/components/ColorSelect";

export interface VariantSelectorProps {
  product: ProductDetailsFragment;
  selectedVariantID?: string;
}


export const VariantSelector: React.VFC<VariantSelectorProps> = ({
  product,
  selectedVariantID
}) => {
  const variants = product.variants;
  const firstVariant = variants?.length ? variants[0] : null
  const [selected, setSelected] = React.useState(firstVariant);

  if (!variants || variants.length === 1) {
    return null;
  }

  if(true){
    return <ColorSelect />
  }

  return (
    <div className="grid grid-cols-8 gap-2">
      <div className={"w-auto  min-w-100"}>
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative mt-1">
            <Listbox.Button
              className="relative w-full py-1 pl-3 pr-10 text-left bg-white cursor-default border-2 border-black  focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
              <span className="block truncate">{selected?.name}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronUpIcon
                className={`${
                  selected ? "transform rotate-180" : ""
                } w-5 h-5 text-gray-800`}
              />
            </span>
            </Listbox.Button>
            <Transition
              as={React.Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                className="absolute w-full py-1 mt-1 overflow-auto border-current text-base bg-white shadow-lg max-h-60 ring-1 ring-black outline-none ring-opacity-5 focus:outline-none sm:text-sm">
                {variants?.map((item, personIdx) => (
                  <Listbox.Option
                    key={item?.id}
                    className={({ active }) =>
                      `${active ? "not-italic font-medium text-base leading-5 text-black hover:text-black" : "text-gray-800 leading-5 hover:text-gray-800"}
                    cursor-default select-none relative pl-3 pr-4`
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <Link
                          key={item?.id}
                          href={{
                            pathname: "/products/[slug]",
                            query: { variant: item?.id, slug: product.slug }
                          }}
                          replace
                          shallow
                        >
                          <a className={`${
                            selected ? "font-medium text-black" : "font-normal text-gray-800"
                          } block truncate hover:text-black hover:font-medium`}
                          >
                            {item?.name}
                          </a>
                        </Link>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </div>
  );
};

export default VariantSelector;
