import { getContentData } from "@/lib/operations";
import VisaCardListing from "./visa-card-listing";

const VisaPage = async () => {
  const data = await getContentData();
  return (
    <>
      <div className="container mb-10">
        <VisaCardListing data={data} />
      </div>
    </>
  );
};

export default VisaPage;
