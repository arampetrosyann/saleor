import React, { useRef } from "react";
import clsx from "clsx";
import classes from "./productsImageSlider.module.css";
import { useWindowSize } from "react-use";
import {
  CarouselProvider,
  Slide,
  Slider,
  Image as SlideImage,
} from "pure-react-carousel";
import Image from "next/image";
import "pure-react-carousel/dist/react-carousel.es.css";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/Button";

interface SlideItem {
  alt?: string,
  url: string,
  type: string,
}

interface ProductImageCarouselProps {
  images: SlideItem[];
}

export const ProductImageCarousel: React.VFC<ProductImageCarouselProps> = ({ images }) => {
  const [photoIndex, setPhotoIndex] = React.useState<number>(0);
  const { width } = useWindowSize();
  const carouselRef = useRef(null)

   React.useEffect(() => {

   },[carouselRef])

  return (
    <>
      <CarouselProvider
        naturalSlideWidth={586}
        naturalSlideHeight={586}
        totalSlides={images.length}
        visibleSlides={1}
        ref={carouselRef}
        className={clsx(classes.root, "min-md:max-w-slide")}
        currentSlide={photoIndex}
        dragEnabled={true}
      >
        <div className={"relative"}>
          <Slider>
            {images.map((item, index) =>
              <div key={index}>
                <Slide index={index} className={classes.slide}>
                  <SlideImage src={item.url} hasMasterSpinner={true} />
                </Slide>
              </div>
            )}
          </Slider>
          {width > 768 && <div className={clsx(classes.arrows, "absolute flex w-full justify-between")}>
            <Button className={"relative w-arrow h-arrow bg-gradient-to-r cursor-pointer border-0 ml-arrow"}
                        onClick={() => setPhotoIndex((prevState) => prevState - 1)} disabled={photoIndex < 1} >
              <Icon size={20} name={"arrow"} className={"transform -rotate-90 absolute left-0"} />
            </Button>
            <Button className={"relative w-arrow h-arrow bg-gradient-to-r cursor-pointer border-0 mr-arrow"}
                        onClick={() => setPhotoIndex((prevState) => prevState + 1)} disabled={photoIndex >= images.length-1} >
                <Icon size={20} name={"arrow"} className={"transform rotate-90 absolute right-0"} />
            </Button>
          </div>}
        </div>
        <div
          className={clsx(((width > 768 && images.length >= 4) || (width <= 768 && images.length >= 5) ? classes.thumbnailList : classes.thumbnailListEff))}>
          <CarouselProvider
            naturalSlideHeight={97}
            naturalSlideWidth={97}
            totalSlides={images.length}
            visibleSlides={width > 768 ? 4 : 5}
            dragEnabled={false}
          >
            <Slider className={"outline-none"}>
              {images.map((item, index) =>
                <div key={index} className={clsx(classes.itemBox)}>
                  <Slide index={index} className={index === photoIndex ? classes.thumbnailSelected : classes.thumbnail}
                         onClick={() => setPhotoIndex(index)}>
                    <div className={classes.imgSlide}>
                      <SlideImage src={item.url} hasMasterSpinner={true} />
                    </div>
                  </Slide>
                </div>
              )}
            </Slider>
          </CarouselProvider>
        </div>
      </CarouselProvider>
    </>
  );
};
