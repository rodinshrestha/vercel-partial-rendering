import { notFound } from "next/navigation";

import { fetchPage } from "@/core/services/page-services";
import { getResolver } from "@/core/services/resolver-services";
import { getMetaData } from "@/core/utils/format";
import Builder from "@/builder/index";
import { makeStaticHeaders } from "@/core/utils/static-header";
import { getFavIcon } from "@/core/utils/get-favicon";

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
    icons: {
      icon: getFavIcon(),
    },
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
    <Builder component={component} key={index} />
  ));
};
export default Home;
