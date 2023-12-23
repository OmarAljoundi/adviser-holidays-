"use client";
import Filter from "@/components/filter";
import FilterSection from "@/components/filter/filter-section";
import Sort from "@/components/filter/sort";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDestination } from "@/hooks/react-query/use-destination";
import { useCustomerFilter } from "@/hooks/use-customer-filter";
import { REVALIDATE_LOCATION_LIST } from "@/lib/keys";
import { getDestination } from "@/lib/operations";
import { getTotalSearchCount } from "@/lib/utils";
import {
  Badge,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Skeleton,
  useDisclosure,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { FilterIcon, X } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FunctionComponent, ReactNode, useMemo } from "react";

interface LayoutListProps {
  children: ReactNode;
}
const LayoutList: FunctionComponent<LayoutListProps> = ({ children }) => {
  const { data, isLoading } = useQuery({
    queryKey: [REVALIDATE_LOCATION_LIST],
    queryFn: async () => await getDestination(),
  });

  const params = useParams();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const search = useCustomerFilter();

  const breads = useMemo(() => {
    if (!isLoading) {
      let BreadCrumbs: any = {
        items: [
          {
            name: "الرئيسية",
            href: "/",
          },
          {
            name: "جميع الرحلات",
            href: "/tour-listing",
          },
        ],
      };

      if (params?.destination && params?.section) {
        BreadCrumbs.items.push({
          name:
            data?.results?.find(
              (x) => x.slug == decodeURIComponent(params.destination as string)
            )?.name || "",
          href: `/tour-listing/${params?.destination}`,
        });
        BreadCrumbs.items.push({
          name: decodeURIComponent(params.section as string).replaceAll(
            "-",
            " "
          ),
        });
      } else if (params?.destination) {
        BreadCrumbs.items.push({
          name:
            data?.results?.find(
              (x) => x.slug == decodeURIComponent(params.destination as string)
            )?.name || "",
        });
      }
      return BreadCrumbs;
    }
    return;
  }, [params?.destination, params?.section, isLoading]);

  return (
    <div className="container mb-12 pt-6 lg:mb-16 px-3 lg:px-0">
      <div className="mb-4 flex flex-col items-start gap-y-2 sm:flex-row sm:items-center justify-between">
        <Breadcrumbs variant="bordered">
          {
            breads?.items.map((item: any) => (
              <BreadcrumbItem href={item.href ?? ""} key={item.name}>
                {item.name}
              </BreadcrumbItem>
            )) as any
          }
        </Breadcrumbs>
        <div className="relative  items-center gap-3 capitalize flex md:[&amp;>li]:!text-base">
          {getTotalSearchCount(search.filter) > 0 ? (
            <div className="flex gap-x-2">
              <Button
                color="danger"
                endContent={
                  <Chip color="primary" size="sm">
                    {getTotalSearchCount(search.filter)}
                  </Chip>
                }
                variant="solid"
                size="sm"
                onPress={() => search.onClear()}
              >
                حذف الفلتر
              </Button>
              <Button
                isIconOnly
                variant="bordered"
                size="sm"
                onPress={onOpen}
                className=" lg:hidden"
              >
                <FilterIcon className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button
              isIconOnly
              variant="bordered"
              size="sm"
              onPress={onOpen}
              className=" lg:hidden"
            >
              <FilterIcon />
            </Button>
          )}

          <Sort />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[330px_5fr] 2xl:gap-12">
        <div className="h-full overflow-y-auto md:overflow-visible bg-white xl:px-0.5 hidden lg:block">
          <div className="grid grid-cols-1 gap-8 px-5 pb-3 md:px-7 xl:p-0 xl:pb-0">
            <Filter />
          </div>
        </div>
        <FilterSection classNames="lg:hidden" />
        <div className="my-3">{children}</div>
      </div>
      <Modal
        classNames={{
          base: "overflow-auto rounded-t-xl",
          header: "text-center text-3xl bg-white  border-b sticky top-0 z-50 ",
          footer:
            "bg-white shadow-card border-t sticky bottom-0 z-50 justify-between",
        }}
        size="full"
        hideCloseButton={false}
        isOpen={isOpen}
        placement={"bottom"}
        onOpenChange={onOpenChange}
      >
        <ModalContent className="max-h-[75%]" as={ScrollArea} dir="rtl">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 ">
                محرك البحث
              </ModalHeader>
              <ModalBody>
                <Filter />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  عرض النتائج
                </Button>
                <Button color="danger" variant="light" onPress={onClose}>
                  حذف الفلتر
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default LayoutList;
