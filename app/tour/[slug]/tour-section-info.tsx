"use client";
import { Tour } from "@/types/custom";
import { FunctionComponent } from "react";
import {
  MdLocalAirport,
  MdOutlineTravelExplore,
  MdWatchLater,
} from "react-icons/md";
import { BsCalendarDay, BsFillCalendar2DateFill } from "react-icons/bs";
import { PiAirplaneTakeoffBold, PiAirplaneLandingBold } from "react-icons/pi";
import IconTourProvider from "@/provider/icon-tour-provider";
import { GiTicket } from "react-icons/gi";
import { Separator } from "@/components/ui/separator";
interface TourSectionInfoProps {
  tour: Tour;
}

const TourSectionInfo: FunctionComponent<TourSectionInfoProps> = ({ tour }) => {
  return (
    <div className="shadow-custom rounded-medium p-4">
      <h4 className="mb-0 text-2xl font-semibold font-primary">{tour.name}</h4>
      <span className="text-sm text-foreground-500">
        {tour.tour_countries?.join(" ، ")}
      </span>
      <Separator className="my-2" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-4 px-2 ">
        <div className="flex gap-x-2 items-center">
          <IconTourProvider>
            <MdWatchLater />
          </IconTourProvider>
          <h4>{tour.number_of_days} أيام </h4>
        </div>
        <div className="flex gap-x-2 items-center">
          <IconTourProvider>
            <BsFillCalendar2DateFill />
          </IconTourProvider>
          <h4>{tour.start_day?.join(" ، ") ?? "اليوم غير محدد"} </h4>
        </div>

        <div className="flex gap-x-2 items-center">
          <IconTourProvider>
            <GiTicket />
          </IconTourProvider>
          <h4>
            {tour.is_ticket_included ? "التذاكر مشمولة" : "التذاكر غير مشمولة"}
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
