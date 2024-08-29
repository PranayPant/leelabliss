import "react-responsive-modal/styles.css";
import { Modal, ModalProps } from "react-responsive-modal";
import styles from "./upload-modal.module.css";
import { Carousel } from "components/carousel";
import { useUploadStore } from "store/upload";
import { UploadSlide } from "./upload-slide";

export function UploadModal(props: ModalProps) {
  const uploads = useUploadStore((store) => store.uploads);
  return (
    <Modal
      center
      classNames={{
        modal: styles["modal-body"],
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
        <button className={styles["submit-btn"]}>Submit files</button>
      </section>
    </Modal>
  );
}
