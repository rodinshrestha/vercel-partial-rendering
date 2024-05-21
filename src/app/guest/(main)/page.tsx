import { notFound } from "next/navigation";

import { fetchPage } from "@/core/services/page-services";
import { getResolver } from "@/core/services/resolver-services";
import { getMetaData } from "@/core/utils/format";
import Builder from "@/builder/index";
import { makeStaticHeaders } from "@/core/utils/static-header";

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata() {
  const headers = makeStaticHeaders();

  const resolver = await getResolver(headers);
  const { home } = resolver.data.pages || {};

  const { data } = await fetchPage(home || "home", headers);

  const { title, description, keywords } = getMetaData(data);

  return {
    title,
    description,
    keywords,
  };
}

const Home = async () => {
  const headers = makeStaticHeaders();

  const resolver = await getResolver(headers);

  const { home } = resolver.data.pages || {};
  /** If there is no home then show not found page */
  if (!home) {
    return notFound();
  }

  const { data } = await fetchPage(home, headers);

  return data.components.map((component, index) => (
    <>
      <Builder
        component={component}
        key={index}
        // params={params}
        // searchParams={searchParams}
      />
    </>
  ));
};
export default Home;
