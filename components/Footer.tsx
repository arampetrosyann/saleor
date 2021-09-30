import React from "react";
import Link from "next/link";

export const Footer = () => {
  const footer = [
    {
      id: 1,
      title: "Products",
      block: ["Cabinets", "Chairs", "Tables", "Stands", "Stands"]
    },
    {
      id: 2,
      title: "About",
      block: ["Cabinets", "Chairs", "Tables"]
    },
    {
      id: 3,
      title: "Sale",
      block: ["Cabinets", "Chairs", "Tables"]
    }
  ];
  return (
    <footer className={"w-full bg-gray-50"}>
      <div className={"w-full mx-auto max-w-page px-page-x pt-61 pb-53 box-border"}>
        <div className={"flex justify-between  max-md:flex-col"}>
          <div>
            <div className={"grid grid-auto-row gap-y-14 max-w-141 mr-30  max-md:mb-40"}>
              <div className={"grid grid-auto-row"}>
                <img className={"block max-h-logo h-auto w-auto"} src="/static/footerImg1.png" alt="" />
                <img className={"block max-h-logo h-auto w-auto"} src="/static/footerImg2.png" alt="" />
              </div>
              <p className={"not-italic font-normal text-base leading-5 text-gray-800"}>1-800-880-6404</p>
              <p className={"not-italic font-normal text-base leading-5 text-gray-800"}>1385 Greg St #105 Sparks, NV
                89431</p>
            </div>
          </div>
          <div className={"min-md:mt-40 flex justify-between  max-w-500 w-full max-500:flex-col"}>
            {footer.map(item => {
              return (
                <div key={item.id} className={"max-500:mb-20"}>
                  <p className={"mt-0 mb-20"}>{item.title}</p>
                  <div className={"flex flex-col gap-y-2.5"}>
                    {item?.block.map(item => {
                      return (
                        <Link href={`/${item}`} key={item}>
                          <a className={"not-italic font-normal text-base leading-5 text-gray-800 hover:text-gray-800"}>
                            {item}
                          </a>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <p className={"text-start mb-0 mt-35 not-italic font-normal text-xs leading-4 "}>Copyright © 2013-2018
          SitStandDesk.com, Inc. All rights reserved.</p>
      </div>
    </footer>
  )
    ;
};
