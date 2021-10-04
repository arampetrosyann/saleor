import { ProductCardFragment } from "@/saleor/api";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import clsx from "clsx";

const styles = {
  grid: `grid grid-cols-4 gap-4`,
  product: {
    name: `block font-normal text-base leading-5 text-gray-800 truncate`,
    category: `block text-sm font-medium text-gray-500`,
    price: `block font-medium text-base leading-5 text-gray-800`,
    details: `flex justify-between items-center px-4 py-2 border-gray-100 bg-gray-100 border-t`
  }
};

export interface ProductCardProps {
  product: ProductCardFragment;
  className?:string,
  detailsBg?:string
}

export const ProductCard: React.VFC<ProductCardProps> = ({ product,className,detailsBg }) => {
  let priceDisplay =
    product.pricing?.priceRange?.start?.gross.localizedAmount || "";
  if (
    product.pricing?.priceRange?.start?.gross.amount !==
    product.pricing?.priceRange?.stop?.gross.amount
  ) {
    priceDisplay = "from " + priceDisplay;
  }
  return (
    <li
      key={product.id}
      className={clsx("relative bg-gray-100 shadow-md hover:shadow-2xl max-w-293 max-md:max-w-177 max-md:min-w-177",className)}
    >
      <Icon size={20} name={"like"} className={"absolute top-2.5 right-2.5"} />
      <Link href={`/products/${product.slug}`} prefetch={false}>
        <a>
          <div className="relative flex rounded justify-center max-h-238 max:md:max-h-144  h-full bg-gray-100"
          >
            <img src={product.thumbnail?.url} className={"w-full h-auto"}/>
            {!!product.pricing?.onSale && (
              <>
                <br />
                <div className="absolute top-7 left-0 bg-red-500 text-white w-1/4 text-center rounded-r-xl shadow-lg">
                  Sale
                </div>
              </>
            )}
          </div>
          <div className={clsx(styles.product.details)} style={{ backgroundColor:detailsBg }}>
            <p className={styles.product.name}>{product.name}</p>
            <p className={styles.product.price}>{priceDisplay}</p>
          </div>
        </a>
      </Link>
    </li>
  );
};
