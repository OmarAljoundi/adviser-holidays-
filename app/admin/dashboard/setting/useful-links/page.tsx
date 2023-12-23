import { Separator } from "@/components/ui/separator";
import { FunctionComponent } from "react";
import CardList from "./card-list";

interface UsefulLinksPageProps {}

const FaqPage: FunctionComponent<UsefulLinksPageProps> = () => {
  return (
    <div className=" lg:px-4 ">
      <div className=" h-full flex-1 flex-col space-y-8 p-8 flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h1 className="text-xl">Useful Links Settings</h1>
            <p className="text-muted-foreground">
              Here&apos;s a list of your useful links!
            </p>
          </div>
        </div>
        <CardList />
        <Separator />
      </div>
    </div>
  );
};

export default FaqPage;
