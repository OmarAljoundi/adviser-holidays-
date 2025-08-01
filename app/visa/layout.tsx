import { Metadata } from "next";
import { FunctionComponent, ReactNode } from "react";
import { visaInfo } from "./lib";

interface LayoutVisaProps {
  children: ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
  const { description, tags, title } = visaInfo?.visa?.seo || {
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
const LayoutVisa: FunctionComponent<LayoutVisaProps> = ({ children }) => {
  return <div className="mt-10">{children}</div>;
};

export default LayoutVisa;
