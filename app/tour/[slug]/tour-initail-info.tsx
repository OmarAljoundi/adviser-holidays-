import { Separator } from "@/components/ui/separator";
import IconTourProvider from "@/provider/icon-tour-provider";
import { QueryTourSchema } from "@/schema";
import { FunctionComponent } from "react";
import { IoPricetags } from "react-icons/io5";
interface TourInitailInfoProps {
  tour: QueryTourSchema;
}

const TourInitailInfo: FunctionComponent<TourInitailInfoProps> = ({ tour }) => {
  return (
    <div className="relative shadow-custom rounded-medium p-4">
      <h4 className="mb-0 text-2xl font-semibold font-primary"> الأسعار</h4>
      <Separator className="my-4" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="grid space-y-2 justify-items-center border bg-gray-200 rounded-medium p-2 md:p-4 gap-x-2 h-full items-start">
          <IconTourProvider>
            <IoPricetags />
          </IconTourProvider>
          <h1 className="text-sm sm:text-base"> بالغ في غرفة مزدوجة</h1>
          <div className=" text-black">
            <span className="font-bold font-english text-lg md:text-xl">
              {" "}
              {tour?.priceDoubleSa}
            </span>{" "}
            <span className="font-primary text-black text-sm">د.أ</span>
          </div>
        </div>
        <div className="grid space-y-2 justify-items-center border  bg-gray-200 rounded-medium p-2 md:p-4 gap-x-2 h-full items-start">
          <IconTourProvider>
            <IoPricetags />
          </IconTourProvider>
          <h1 className="text-sm sm:text-base flex flex-col md:flex-row text-center">
            <span>غرفة مفردة</span>
          </h1>
          <div className=" text-black">
            <span className="font-bold font-english text-lg md:text-xl">
              {" "}
              {tour?.priceSingleSa}
            </span>{" "}
            <span className="font-primary text-black text-sm">د.أ</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourInitailInfo;
