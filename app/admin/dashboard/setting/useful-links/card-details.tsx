import BlurImageV2 from "@/components/common/BlurImageV2";
import { useModal } from "@/hooks/use-modal";
import { useSetting } from "@/hooks/use-setting";
import { PushJsonFile } from "@/lib/storage-operations";
import { Link } from "@/types/custom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { Edit, Link as LinkIcon, Trash } from "lucide-react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { FunctionComponent } from "react";
import { toast } from "sonner";

const CardDetails: FunctionComponent<Link> = ({
  desc,
  externalLink,
  imageUrl,
  title,
  uuid,
}) => {
  const config = useSetting();
  const route = useRouter();
  const model = useModal();
  const handleDelete = () => {
    let newObject = { ...config.setting };
    newObject = {
      ...newObject,
      usefulLinks: {
        ...newObject.usefulLinks,
        links: [
          ...(newObject.usefulLinks?.links?.filter((x) => x.uuid !== uuid) ??
            []),
        ],
      },
    };

    const jsonData = JSON.stringify(newObject);
    const blob = new Blob([jsonData], { type: "application/json" });
    toast.promise(PushJsonFile(blob), {
      loading: "Saving your changes..",
      error(error) {
        return error;
      },
      success() {
        config.onCreate(newObject);
        route.refresh();
        return "Saved successfully";
      },
    });
  };
  return (
    <Card className="pt-4">
      <CardHeader className="pt-2 px-4 flex items-center justify-end pb-2">
        <h4 className="font-bold text-large text-right">{title}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2 border-t pb-4 justify-end">
        <div className="flex justify-between">
          {imageUrl && (
            <BlurImageV2
              src={imageUrl}
              alt=""
              width={500}
              height={500}
              className="max-w-[100px]"
              quality={100}
            />
          )}
          <h4 className=" text-medium text-right flex-grow">{desc}</h4>
        </div>
      </CardBody>
      <CardFooter className="pt-2 p-0 border-t">
        <div className="flex gap-1 justify-between items-center w-full pt-3 pb-1 px-4">
          <div className="flex">
            <Button
              isIconOnly
              className="text-default-900/60 data-[hover]:bg-foreground/10 "
              radius="full"
              variant="light"
              onPress={() =>
                model.onOpenUsefulLinks({
                  desc,
                  externalLink,
                  imageUrl,
                  title,
                  uuid,
                })
              }
            >
              <Edit />
            </Button>
            <Button
              isIconOnly
              className="text-default-900/60   data-[hover]:bg-foreground/10"
              radius="full"
              variant="light"
              onPress={() => handleDelete()}
            >
              <Trash />
            </Button>
          </div>
          <Button
            startContent={<LinkIcon className="w-4 h-4" />}
            as={"a"}
            size="sm"
            href={externalLink}
            target="_blank"
            color="primary"
            variant="bordered"
          >
            External Link
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CardDetails;
