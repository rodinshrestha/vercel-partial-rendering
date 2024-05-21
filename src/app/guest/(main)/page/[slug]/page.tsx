import React from "react";

import { PageProps } from "@/core/types/page-props.types";
import { makeStaticHeaders } from "@/core/utils/static-header";
import { fetchPage } from "@/core/services/page-services";
import { getMetaData } from "@/core/utils/format";
import Builder from "@/builder/index";
import { fetchProfile } from "@/auth/services/auth-service";

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: PageProps<"slug">) {
  const { slug } = params;
  const headers = makeStaticHeaders();

  await fetchProfile();
  const { data } = await fetchPage(slug as string, headers);

  const { title, description, keywords } = getMetaData(data);

  return {
    title,
    description,
    keywords,
  };
}

const DynamicPage = async ({ params }: PageProps<"slug">) => {
  const { slug } = params;

  const headers = makeStaticHeaders();

  await fetchProfile();
  const { data } = await fetchPage(slug as string, headers);

  return data.components.map((component, index) => (
    <Builder component={component} key={index} />
  ));
};

export default DynamicPage;
