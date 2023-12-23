"use client";
import { Button, Input, ModalFooter, Textarea } from "@nextui-org/react";
import { Modal } from "../shared/modal";
import { v4 as uuidv4 } from "uuid";
import { Faq, Link } from "@/types/custom";
import { useFormik } from "formik";
import { useState } from "react";
import { useModal } from "@/hooks/use-modal";
import { useSetting } from "@/hooks/use-setting";
import { PushJsonFile } from "@/lib/storage-operations";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import SingleImageForm from "@/shared/single-image-form";
import { X } from "lucide-react";
import { Button as ShcdnButton } from "@/components/ui/button";
import BlurImageV2 from "@/components/common/BlurImageV2";

const UsefulLinkModal = () => {
  const usefulModal = useModal();
  const config = useSetting();
  const route = useRouter();

  const [uniqueId, setUniqueId] = useState(uuidv4());

  const { isOpenUsefulLinks, onClose, data } = usefulModal;
  const handleSubmitSection = (formData: Link) => {
    let newObject = { ...config.setting };
    if (data) {
      newObject = {
        ...newObject,
        usefulLinks: {
          ...newObject.usefulLinks,
          links: [
            ...(newObject.usefulLinks?.links?.filter(
              (x) => x.uuid !== data.uuid
            ) ?? []),
            formData,
          ],
        },
      };
    } else {
      newObject = {
        ...newObject,
        usefulLinks: {
          ...newObject.usefulLinks,
          links: [...(newObject.usefulLinks?.links ?? []), formData],
        },
      };
    }

    config.onCreate(newObject);
    const jsonData = JSON.stringify(newObject);
    const blob = new Blob([jsonData], { type: "application/json" });
    toast.promise(PushJsonFile(blob), {
      loading: "Saving your changes..",
      error(error) {
        return error;
      },
      success() {
        route.push("/admin/dashboard/setting/useful-links");
        return "Saved successfully";
      },
    });

    setUniqueId(uuidv4());
    resetForm();
    onClose();
  };

  const formik = useFormik({
    initialValues: usefulModal.data ?? {
      uuid: uniqueId,
    },
    onSubmit: handleSubmitSection,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
  });

  const {
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    resetForm,
    handleSubmit,
    setFieldValue,
  } = formik;

  return (
    <Modal
      isOpen={isOpenUsefulLinks}
      onClose={onClose}
      dialogClass="px-2"
      title="Create new useful link"
      renderFooter={() => {
        return (
          <ModalFooter>
            <Button
              variant="bordered"
              color="primary"
              type="button"
              onClick={() => handleSubmit()}
            >
              Submit
            </Button>
          </ModalFooter>
        );
      }}
    >
      <form className="grid space-y-4 mt-4 gap-x-4">
        <div className="space-y-4">
          <div className="grid gap-y-4">
            <SingleImageForm
              formik={formik}
              field="imageUrl"
              maxNumber={1}
              recommendedSize="Best Image Size 1080x1080 Ratio 1:1"
            >
              {values.imageUrl && (
                <div className="image-item  border rounded-xl relative dark:bg-white w-28 mt-5">
                  <BlurImageV2
                    src={values.imageUrl}
                    alt=""
                    width={800}
                    height={400}
                    quality={100}
                    className="rounded-xl w-28"
                  />
                  <ShcdnButton
                    type="button"
                    size={"icon"}
                    variant={"ghost"}
                    className="absolute -top-2 -right-2 bg-white w-6 h-6 rounded-medium border border-red-600"
                    onClick={() => {
                      setFieldValue("image", undefined);
                    }}
                  >
                    <X className="w-4 h-4 text-red-600" />
                  </ShcdnButton>
                </div>
              )}
            </SingleImageForm>

            <Input
              label="External Link"
              labelPlacement="outside"
              placeholder="https://...."
              onChange={handleChange}
              onBlur={handleBlur}
              onClear={() => setFieldValue("externalLink", "")}
              value={values.externalLink || ""}
              name="externalLink"
              isClearable
              isInvalid={touched.externalLink && !!errors.externalLink}
            />
            <Input
              label="Title"
              labelPlacement="outside"
              placeholder="Enter title"
              onChange={handleChange}
              onBlur={handleBlur}
              onClear={() => setFieldValue("title", "")}
              value={values.title || ""}
              name="title"
              isClearable
              isInvalid={touched.title && !!errors.title}
            />
            <Textarea
              label="Description"
              labelPlacement="outside"
              placeholder="Enter description"
              name="desc"
              value={values.desc}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.desc && !!errors.desc}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};
export default UsefulLinkModal;
