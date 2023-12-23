import BlurImage from "@/components/common/blur-image";
import { Separator } from "@/components/ui/separator";
import { VisaType } from "@/types/custom";
import { Chip } from "@nextui-org/react";
import { FunctionComponent } from "react";

interface VisaCardProps {
  visa: VisaType;
}

const VisaCard: FunctionComponent<VisaCardProps> = ({ visa }) => {
  return (
    <div className="flex flex-col justify-center h-full">
      <div className="relative gap-x-4 flex flex-col lg:flex-row md:space-x-5 space-y-3 md:space-y-0 h-full shadow-custom rounded-medium p-3 max-w-sm md:max-w-3xl mx-auto border border-white bg-white">
        <div className="w-full lg:w-1/3 bg-white grid place-items-center content-between">
          <BlurImage
            src={`${visa.image}`}
            alt={visa.title || ""}
            width={400}
            height={200}
          />
        </div>
        <div className="w-full lg:w-2/3 bg-white flex flex-col space-y-2  p-3">
          <h3 className="font-black text-gray-800 md:text-3xl text-xl text-ellipsis overflow-hidden line-clamp-1">
            {visa.title}
          </h3>
          <p className="md:text-lg text-gray-500 text-base text-ellipsis overflow-hidden line-clamp-1">
            {visa.sub_title}
          </p>
          <Separator className="my-2" />
          <h4 className="text-lg">المتطلبات</h4>
          <ul className="list-inside list-disc">
            {visa.requirements?.map((req) => (
              <li key={req}>{req}</li>
            ))}
          </ul>
          <Separator className="my-2" />
          <div className="rounded-medium shadow-custom text-primary bg-secondary p-2">
            <p>{visa.note}</p>
          </div>
          <Chip color="primary">سعر التأشيرة: {visa.price} </Chip>
        </div>
      </div>
    </div>
  );
};

export default VisaCard;
