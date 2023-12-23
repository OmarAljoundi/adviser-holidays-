import { getContentData } from "@/lib/operations";
import { FunctionComponent } from "react";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import LinksBreadCrumb from "./links-bread-crumb";
import LinkItems from "./link-items";

export async function generateMetadata(): Promise<Metadata> {
  const response = await getContentData();

  const { description, tags, title } = response?.usefulLinks?.seo || {
    title: "",
    description: "",
    tags: "",
  };
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_URL!),
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: "website",
      siteName: "Adviser holidays",
    },
    keywords: tags,
  };
}

const UsefulLinksPage = async () => {
  const data = await getContentData();

  return (
    <>
      <div className="container mb-10">
        <LinksBreadCrumb />
        <Separator className="my-4" />

        <h1 className="text-primary text-2xl lg:text-4xl  text-center my-10">
          الروابط المهمة
        </h1>

        <LinkItems data={data} />
      </div>
    </>
  );
};

export default UsefulLinksPage;
