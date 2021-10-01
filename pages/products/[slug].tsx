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

    const productImage = product?.media![0];

    console.log(product, "productProductProduct");

    return (
      <BaseTemplate>
        <ProductPageSeo product={product} />
        <main className="grid grid-cols-1 min-md:grid-cols-2 gap-4 max-w-7xl mx-auto pt-8 min-md:px-8">
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
          </div>
          <div className="space-y-8 max-md:px-5">
            {width > 767 && <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-800">
                {product?.name}
              </h1>
              <StarsRating rating={5} />
              <Link href={`/category/${product?.category?.slug}`} passHref>
                <p className="text-lg mt-2 font-medium text-gray-500 cursor-pointer">
                  {product?.category?.name}
                </p>
              </Link>
            </div>}
            {width >767 && <p className="text-2xl text-gray-900">{price}</p>}
            {product?.description && (
              <div className="text-base text-gray-700 space-y-6">
                <RichText jsonStringData={product.description} />
              </div>
            )}
            <VariantSelector
              product={product}
              selectedVariantID={selectedVariantID}
            />
            {selectedVariant && selectedVariant?.quantityAvailable > 0 ? (
              <Button
                onClick={onAddToCart}
                type="submit"
                disabled={loadingAddToCheckout}
                className="max-w-223 w-full bg-black border hover:bg-black border-transparent font-medium text-base leading-5 text-center uppercase py-11 px-57"
              >
                {loadingAddToCheckout ? "Adding..." : "Add to cart"}
              </Button>
            ) : (
              <p className="text-lg- text-yellow-600">Sold out!</p>
            )}
            {!!addToCartError && <p>{addToCartError}</p>}
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
