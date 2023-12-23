"use client";
import BlurImageV2 from "@/components/common/BlurImageV2";
import { Setting } from "@/types/custom";
import { Button } from "@nextui-org/react";
import { Link } from "lucide-react";
import { FunctionComponent } from "react";

interface LinkItemsProps {
  data: Setting | undefined;
}

const LinkItems: FunctionComponent<LinkItemsProps> = ({ data }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-start">
      {data?.usefulLinks?.links?.map((item) => (
        <div
          className="flex flex-col p-3 shadow-medium rounded-medium h-full justify-between" // Flex container
          key={item.uuid}
        >
          <div className="flex-grow">
            <BlurImageV2
              src={item?.imageUrl || `/placeholder.svg`}
              width={1080}
              height={1080}
              quality={100}
              className="max-h-[200px]"
              alt=""
            />
            <div className="p-3 space-y-2">
              <h1 className="font-bold text-xl">{item.title}</h1>
              <p className="text-muted-foreground text-small">{item.desc}</p>
            </div>
          </div>

          <Button
            endContent={<Link className="w-4 h-4" />}
            as={"a"}
            size="sm"
            href={item.externalLink}
            target="_blank"
            color="primary"
            variant="bordered"
          >
            عرض المعلومات
          </Button>
        </div>
      ))}
    </div>
  );
};

export default LinkItems;
