import React from "react";
import Link from "next/link";
import { useWindowSize } from "react-use";
import { Icon } from "./Icon";

export const Menu = () => {
  const { width } = useWindowSize();
  const data = [
    {
      id: 1,
      name: "Category"
    },
    {
      id: 2,
      name: "Category"
    },
    {
      id: 3,
      name: "Category"
    },
    {
      id: 4,
      name: "Category"
    },
    {
      id: 5,
      name: "Category"
    },
    {
      id: 6,
      name: "Category"
    }
  ];
  return (
    <div>
      {width > 768 ? <div className={"flex flex-nowrap last:mr-0"}>
          {data.map((item) => {
            return (
              <Link key={item.id} href={item.name}>
                <a
                  className={"not-italic font-semibold text-base leading-5 text-gray-800 no-underline hover:text-gray-800 mr-30 "}>{item.name}</a>
              </Link>
            );
          })}
        </div>:
        (
          <div>
            <Icon name={"menu"} size={20}/>
          </div>
        )
      }
    </div>
  );
};
