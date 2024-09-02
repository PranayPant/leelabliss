import "react-responsive-modal/styles.css";
import { Modal, ModalProps } from "react-responsive-modal";
import styles from "./upload-modal.module.css";
import { Carousel } from "components/carousel";
import { uploadStore, useUploadStore } from "store/upload";
import { UploadSlide } from "./upload-slide";

export function UploadModal(props: ModalProps) {
  const uploads = useUploadStore((store) => store.uploads);
  const isSubmittingForm = useUploadStore((store) => store.uploads).some(
    (upload) => upload.uploadStatus === "pending",
  );
  const handleSubmit = () => {
    const forms = Array.from(document.querySelectorAll("form"));
    const submissions = forms.map((form) => {
      const imagePath = form.id;
      const title = (
        form.querySelector("input[name=title]") as HTMLInputElement
      )?.value;
      const description = (
        form.querySelector("input[name=description]") as HTMLInputElement
      )?.value;
      const tags = JSON.parse(
        (
          form.querySelector("input[name=tags]") as HTMLInputElement
        )?.getAttribute("data-tags") ?? "[]",
      );

      return {
        imagePath,
        title,
        description,
        tags,
      };
    });
    uploadStore.setState({
      uploads: uploadStore.getState().uploads.map((upload) => ({
        ...upload,
        ...submissions.find((item) => item.imagePath === upload.file?.name),
      })),
    });
    uploadStore.getState().uploadFiles();
  };
  return (
    <Modal
      closeOnEsc={!isSubmittingForm}
      closeOnOverlayClick={!isSubmittingForm}
      blockScroll={isSubmittingForm}
      showCloseIcon={!isSubmittingForm}
      center
      classNames={{
        modal: styles["modal-body"],
        overlay: isSubmittingForm
          ? styles["modal-submitting-overlay"]
          : undefined,
      }}
      {...props}
    >
      <section>
        <Carousel
          slides={uploads.map((upload) => ({
            id: upload.file?.name ?? "",
            data: <UploadSlide file={upload.file} />,
          }))}
        />
      </section>
      <button
        onClick={handleSubmit}
        type="button"
        className={styles["submit-btn"]}
        disabled={isSubmittingForm}
      >
        {isSubmittingForm && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
              opacity="0.25"
            />
            <path
              fill="currentColor"
              d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
            >
              <animateTransform
                attributeName="transform"
                dur="0.75s"
                repeatCount="indefinite"
                type="rotate"
                values="0 12 12;360 12 12"
              />
            </path>
          </svg>
        )}
        <span>Submit files</span>
      </button>
    </Modal>
  );
}
