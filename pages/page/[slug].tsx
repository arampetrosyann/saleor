import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { usePageQuery } from "@/saleor/api";
import BaseTemplate from "@/components/BaseTemplate";
import RichText from "@/components/RichText";

export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {
      pageSlug: context.params?.slug?.toString(),
    },
  };
};

const PagePage: React.VFC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  pageSlug,
}) => {
  const { loading, error, data } = usePageQuery({
    variables: { slug: pageSlug || "" },
    skip: !pageSlug,
  });

  if (loading) return <BaseTemplate isLoading={true} />;
  if (error) return <p>Error</p>;

  const page = data?.page;
  if (!page?.id) {
    return null;
  }

  return (
    <BaseTemplate>
      <main className="max-w-7xl mx-auto pt-8 px-8">
        {!!page.content && <RichText jsonStringData={page.content} />}
      </main>
    </BaseTemplate>
  );
};

export default PagePage;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}
