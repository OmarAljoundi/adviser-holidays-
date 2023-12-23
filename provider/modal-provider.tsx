import dynamic from "next/dynamic";

const UsefulLinkModal = dynamic(() => import("@/modals/useful-links-modal"), {
  ssr: false,
});
const TourTypeModal = dynamic(() => import("@/modals/tour-type-modal"), {
  ssr: false,
});

const SlideModal = dynamic(() => import("@/modals/slide-modal"), {
  ssr: false,
});

const SectionModal = dynamic(() => import("@/modals/section-modal"), {
  ssr: false,
});

const ImageModal = dynamic(() => import("@/modals/image-modal"), {
  ssr: false,
});

const FeatureModal = dynamic(() => import("@/modals/feature-modal"), {
  ssr: false,
});
const FaqModal = dynamic(() => import("@/modals/faq-modal"), {
  ssr: false,
});

const DestinationToursModal = dynamic(
  () => import("@/modals/destination-tours-modal"),
  {
    ssr: false,
  }
);

const DestinationModal = dynamic(() => import("@/modals/destination-modal"), {
  ssr: false,
});

const AttachmentModal = dynamic(() => import("@/modals/attachment-modal"), {
  ssr: false,
});
export const ModalProvider = () => {
  return (
    <>
      <ImageModal />
      <SectionModal />
      <FeatureModal />
      <TourTypeModal />
      <DestinationModal />
      <DestinationToursModal />
      <AttachmentModal />
      <FaqModal />
      <SlideModal />
      <UsefulLinkModal />
    </>
  );
};
