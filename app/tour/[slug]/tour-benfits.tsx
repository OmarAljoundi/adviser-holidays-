import { Separator } from "@/components/ui/separator";
import IconTourProvider from "@/provider/icon-tour-provider";
import { Tour } from "@/types/custom";
import { Check, Dot, X } from "lucide-react";
import { FC } from "react";
import { BsCheckLg } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
const TourBenfits: FC<{ tour: Tour }> = ({ tour }) => {
  return (
    <div className="shadow-custom rounded-medium p-4">
      <h4 className="mb-0 text-2xl font-semibold font-primary">
        مميزات البرنامج
      </h4>
      <Separator className="my-4" />
      <div className="flex gap-x-2 justify-start items-center">
        <IconTourProvider background="green" iconColorClass="text-white">
          <BsCheckLg />
        </IconTourProvider>
        <h6 className="font-semibold font-primary"> البرنامج يشمل </h6>
      </div>
      <ul className="flex flex-col gap-4 mb-10 mt-5">
        {tour?.tour_includes?.map((i) => (
          <li key={i.uuid}>
            <div className="flex items-start gap-4">
              <div className="grid items-start">
                <span className="font-bold font-primary text-sm">
                  {i.title}
                </span>
                <span className="inline-block font-primary ">
                  <div className="grid items-center flex-wrap">
                    {i.description.split(",").map((i) => (
                      <div className="flex items-center" key={i}>
                        <div>
                          <Dot className="text-green-900 w-6 h-6" />
                        </div>
                        <div>{i}</div>
                      </div>
                    ))}
                  </div>
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex gap-x-2 justify-start items-center ">
        <IconTourProvider background="red" iconColorClass="text-white">
          <RxCross2 />
        </IconTourProvider>
        <h6 className="font-semibold font-primary"> البرنامج لايشمل</h6>
      </div>
      <ul className="flex flex-col gap-4 mb-10  mt-5">
        {tour?.tour_excludes?.map(({ uuid, description, title }) => (
          <li key={uuid}>
            <div className="grid items-center flex-wrap">
              {description.split(",").map((i) => (
                <div className="flex items-center" key={i}>
                  <div>
                    <Dot className="text-red-600 w-6 h-6" />
                  </div>
                  <div>{i}</div>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TourBenfits;
