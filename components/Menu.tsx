import React from "react";
import Link from "next/link";
import { useWindowSize } from "react-use";
import { Icon } from "./Icon";
import { useMenuQuery } from "@/saleor/api";

export const Menu = () => {
  const { width } = useWindowSize();
  const { data, loading } = useMenuQuery({ variables: { slug: "homepage" } });

  return (
    <div>
      {width > 768 ? <div className={"flex flex-nowrap last:mr-0"}>
          {data?.menu?.items?.map((item) => {
            return (
              <Link key={item?.id} href={`/category/${item?.category?.slug}`}>
                <a
                  className={"not-italic font-semibold text-base leading-5 text-gray-800 no-underline hover:text-gray-800 mr-30 "}>{item?.name}</a>
              </Link>
            );
          })}
        </div> :
        (<div>
          <Icon name={"menu"} size={20} />
        </div>)
      }
    </div>
  );
};
