import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ProductFilterInput, useProductCollectionQuery } from "@/saleor/api";
import { ProductCard } from "@/components/ProductCard";
import { useWindowSize } from "react-use";
import classes from "./relat.module.css";
import { Buffer } from "buffer";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";

const responsive = (width: number) => ({
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
    partialVisibilityGutter: 0
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    partialVisibilityGutter: 0
  },
  tablet: {
    breakpoint: { max: 1024, min: 767 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 767, min: 0 },
    items: width < 450 ? 1 : width < 630 ? 2 : 3,
    partialVisibilityGutter: width < 450 ? 0 : 0
  }
});

export const RelatedProductsSlider: React.VFC = ({}) => {
  const filter: ProductFilterInput = {};
  const { width } = useWindowSize();
  const refCarousel = React.useRef<any>(null);
  const { loading, error, data, fetchMore } = useProductCollectionQuery({
    variables: { filter: filter }
  });

  if (!data || !data?.products || !data?.products?.edges) {
    return null;
  }

  return (
    <div className={classes.root}>
      {width > 767 ? <div className={"flex justify-between px-page-x mb-32 items-center"}>
        <p>Related Products</p>
        <div className={"flex justify-between w-100"}>
          <Button onClick={() => refCarousel?.current?.previous()}
                  style={{ borderRadius: "50%", width: "30px", height: "40px" }}
                  className={"relative flex justify-center items-center bg-gray-200 rounded-bl-full"}><Icon
            size={20} name={"arrow"} style={{ left: "20px" }}
            className={"transform -rotate-90 absolute inset-0"} /></Button>
          <Button onClick={() => refCarousel?.current?.next()}
                  style={{ borderRadius: "50%", width: "30px", height: "40px" }}
                  className={"relative flex justify-center items-center bg-gray-200 rounded-bl-full "}><Icon
            size={20} name={"arrow"} style={{ right: "20px" }}
            className={"transform rotate-90 absolute inset-0"} /></Button>
        </div>
      </div> : null}
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={false}
        responsive={responsive(width)}
        ssr={true}
        ref={refCarousel}
        infinite={false}
        arrows={false}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px"
      >
        {data?.products?.edges?.map(product => {
          return <ProductCard key={product.node.id} product={product.node} className={classes.slide}
                              detailsBg={"white"} />;
        })}
      </Carousel>
    </div>
  );
};


