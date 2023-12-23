"use client";
import { Separator } from "@/components/ui/separator";
import { useSetting } from "@/hooks/use-setting";
import IconTourProvider from "@/provider/icon-tour-provider";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { FunctionComponent } from "react";
import { PiQuestion } from "react-icons/pi";
import { AiOutlinePlus } from "react-icons/ai";
interface FaqListProps {}

const FaqList: FunctionComponent<FaqListProps> = () => {
  const setting = useSetting((x) => x.setting?.faq);

  if (!setting || setting.length == 0) return null;

  return (
    <div className="relative  p-4">
      <div className="container">
        <h1 className="text-3xl text-center">الأسئلة الشائعة</h1>

        <Separator className="my-4" />
        <Accordion selectionMode="multiple" variant="splitted">
          {/* @ts-ignore */}
          {setting?.map((faq) => (
            <AccordionItem
              key={faq.uuid}
              aria-label={faq.title}
              startContent={
                <IconTourProvider>
                  <PiQuestion />
                </IconTourProvider>
              }
              title={faq.title}
              indicator={
                <IconTourProvider>
                  <AiOutlinePlus />
                </IconTourProvider>
              }
            >
              {faq.description}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FaqList;
