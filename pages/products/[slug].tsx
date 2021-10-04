import React, { useState } from "react";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { ApolloQueryResult } from "@apollo/client";
import { useAuthState } from "@saleor/sdk";
import {
  useAddProductToCheckoutMutation,
  ProductPathsQuery,
  ProductPathsDocument,
  useCheckoutByTokenQuery,
  CheckoutError,
  useCreateCheckoutMutation,
  ProductBySlugDocument,
  ProductBySlugQuery
} from "@/saleor/api";
import apolloClient from "@/lib/graphql";

import { ProductPageSeo } from "@/components/seo/ProductPageSeo";
import RichText from "@/components/RichText";
import BaseTemplate from "@/components/BaseTemplate";
import VariantSelector from "@/components/VariantSelector";
import { useLocalStorage, useWindowSize } from "react-use";
import { CHECKOUT_TOKEN } from "@/lib/const";
import Custom404 from "pages/404";
import { ProductImageCarousel } from "@/components/ProductImageCarousel/ProductImageCarousel";
import { Button } from "@/components/Button";
import { StarsRating } from "@/components/StarsRating";
import { DisclosureBase } from "@/components/Disclosure";
import { RelatedProductsSlider } from "@/components/RelatedProducts";

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const productSlug = context.params?.slug?.toString();
  const data: ApolloQueryResult<ProductBySlugQuery | undefined> =
    await apolloClient.query({
      query: ProductBySlugDocument,
      variables: {
        slug: productSlug
      }
    });
  return {
    props: {
      productSSG: data
    },
    revalidate: 60 // value in seconds, how often ISR will trigger on the server
  };
};

const ProductPage: React.VFC<InferGetStaticPropsType<typeof getStaticProps>> =
  ({ productSSG }) => {
    const router = useRouter();
    const [checkoutToken, setCheckoutToken] = useLocalStorage(CHECKOUT_TOKEN);
    const [createCheckout] = useCreateCheckoutMutation();
    const { user } = useAuthState();
    const { width } = useWindowSize();
    const { data: checkoutData } = useCheckoutByTokenQuery({
      variables: { checkoutToken },
      skip: !checkoutToken || !process.browser
    });
    const [addProductToCheckout] = useAddProductToCheckoutMutation();
    const [loadingAddToCheckout, setLoadingAddToCheckout] = useState(false);
    const [addToCartError, setAddToCartError] = useState("");

    const product = productSSG?.data?.product;
    if (!product?.id) {
      return <Custom404 />;
    }
    const price = product?.pricing?.priceRange?.start?.gross.localizedAmount;

    // We have to check if code is run on the browser
    // before we can use the router
    const queryVariant = process.browser
      ? router.query.variant?.toString()
      : undefined;
    const selectedVariantID = queryVariant || product?.variants![0]!.id!;

    const selectedVariant = product?.variants?.find(
      (v) => v?.id === selectedVariantID
    );

    const onAddToCart = async () => {
      // Clear previous error messages
      setAddToCartError("");

      // Block add to checkout button
      setLoadingAddToCheckout(true);
      const errors: CheckoutError[] = [];

      if (!!checkoutData?.checkout) {
        // If checkout is already existing, add products
        const { data: addToCartData } = await addProductToCheckout({
          variables: {
            checkoutToken: checkoutToken,
            variantId: selectedVariantID
          }
        });
        addToCartData?.checkoutLinesAdd?.errors.forEach((e) => {
          if (!!e) {
            errors.push(e);
          }
        });
      } else {
        // Theres no checkout, we have to create one
        const { data: createCheckoutData } = await createCheckout({
          variables: {
            email: user?.email || "anonymous@example.com",
            lines: [
              {
                quantity: 1,
                variantId: selectedVariantID
              }
            ]
          }
        });
        createCheckoutData?.checkoutCreate?.errors.forEach((e) => {
          if (!!e) {
            errors.push(e);
          }
        });
        if (createCheckoutData?.checkoutCreate?.checkout?.token) {
          setCheckoutToken(createCheckoutData?.checkoutCreate?.checkout?.token);
        }
      }
      // Enable button
      setLoadingAddToCheckout(false);

      if (errors.length === 0) {
        // Product successfully added, redirect to cart page
        router.push("/cart");
        return;
      }

      // Display error message
      const errorMessages =
        errors.map((e) => {
          return e.message || "";
        }) || [];
      setAddToCartError(errorMessages.join("\n"));
    };

    return (
      <BaseTemplate>
        <ProductPageSeo product={product} />
        <main
          className="w-full max-w-page mx-auto px-page-x pt-main-t pb-main-b pt-main max-md:px-0 max-md:pt-ty max-md:pb-24">
          <div
            className={"grid grid-cols-2 gap-x-prodPage gap-y-10 items-start max-md:gap-y-mainMin max-md:grid-cols-1"}>
            <div className="w-full min-md:max-w-slid">
              {width <= 767 && <div className={"px-5 mb-20  grid gap-10"}>
                <h1 className="text-lg font-bold tracking-tight text-gray-800">
                  {product?.name}
                </h1>
                <StarsRating rating={5} />
                <p className="font-semibold text-base leading-5 text-black">{price}</p>
              </div>}
              {product?.media?.length && (
                <ProductImageCarousel images={product.media} />
              )}
              <div className={"mt-100 max-md:px-page-x"}>
                <RelatedProductsSlider  />
              </div>
            </div>
            <div className="max-md:px-5 w-full">
              {width > 767 && <div className={"grid"}>
                <h1 className="text-4xl font-bold tracking-tight text-gray-800">
                  {product?.name}
                </h1>
                <StarsRating rating={5} />
                <p className="not-italic font-semibold text-2xl leading-7 text-black mt-15">{price}</p>
              </div>}
              <div className={"grid grid-flow-col items-center"} style={{ gap: "29px" }}>
                <p className={"not-italic font-medium text-base leading-5 text-gray-800"}>Select size</p>
                <VariantSelector
                  product={product}
                  selectedVariantID={selectedVariantID}
                />
              </div>
              <div className={"mt-45"}>
                {selectedVariant && selectedVariant?.quantityAvailable > 0 ? (
                  <Button
                    onClick={onAddToCart}
                    type="submit"
                    disabled={loadingAddToCheckout}
                    className="max-w-223 w-full bg-black border hover:bg-black border-transparent font-medium text-base leading-5 text-center uppercase py-11 px-57 max-md:max-w-full"
                  >
                    {loadingAddToCheckout ? "Adding..." : "Add to cart"}
                  </Button>
                ) : (
                  <p className="text-lg- text-yellow-600">Sold out!</p>
                )}
                {!!addToCartError && <p>{addToCartError}</p>}
                <div className={"mt-52"}>
                  <DisclosureBase title={"Product Details"}
                                  content={"If you're unhappy with your purchase for any reason, email us\n" +
                                  "                within 90 days and we'll refund you in full, no questions asked."} />
                  <DisclosureBase title={"Specifications"} />
                  <DisclosureBase title={"Shipping and Returns"} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </BaseTemplate>
    );
  };

export default ProductPage;

export async function getStaticPaths() {
  const result: ApolloQueryResult<ProductPathsQuery | undefined> =
    await apolloClient.query({
      query: ProductPathsDocument,
      variables: {}
    });
  const paths =
    result.data?.products?.edges.map(({ node }) => ({
      params: { slug: node.slug }
    })) || [];

  return {
    paths,
    fallback: "blocking"
  };
}
