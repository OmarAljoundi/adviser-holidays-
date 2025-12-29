"use client";
import { FunctionComponent } from "react";
import { MdWatchLater } from "react-icons/md";
import { BsFillCalendar2DateFill } from "react-icons/bs";
import IconTourProvider from "@/provider/icon-tour-provider";
import { GiTicket } from "react-icons/gi";
import { Separator } from "@/components/ui/separator";
import { QueryTourSchema } from "@/schema";
interface TourSectionInfoProps {
  tour: QueryTourSchema;
}

const TourSectionInfo: FunctionComponent<TourSectionInfoProps> = ({ tour }) => {
  return (
    <div className="shadow-custom rounded-medium p-4">
      <h4 className="mb-0 text-2xl font-semibold font-primary">{tour.name}</h4>
      <span className="text-sm text-foreground-500">
        {tour.tourCountries?.join(" ، ")}
      </span>
      <Separator className="my-2" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-4 px-2 ">
        <div className="flex gap-x-2 items-center">
          <IconTourProvider>
            <MdWatchLater />
          </IconTourProvider>
          <h4>{tour.numberOfDays} أيام </h4>
        </div>
        <div className="flex gap-x-2 items-center">
          <IconTourProvider>
            <BsFillCalendar2DateFill />
          </IconTourProvider>
          <h4>{tour.startDay?.join(" ، ") ?? "اليوم غير محدد"} </h4>
        </div>

        <div className="flex gap-x-2 items-center">
          <IconTourProvider>
            <GiTicket />
          </IconTourProvider>
          <h4>
            {tour.isTicketIncluded ? "التذاكر مشمولة" : "التذاكر غير مشمولة"}
          </h4>
        </div>
        {/* <div className="flex gap-x-2 items-center">
          <IconTourProvider>
            <MdOutlineTravelExplore />
          </IconTourProvider>
          <h4>{tour.tour_type?.name}</h4>
        </div> */}
      </div>
    </div>
  );
};

export default TourSectionInfo;
