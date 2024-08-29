import "react-responsive-modal/styles.css";
import { Modal, ModalProps } from "react-responsive-modal";
import styles from "./upload-modal.module.css";
import { Carousel } from "components/carousel";

export function UploadModal(props: ModalProps) {
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
          slides={[
            { id: "1", data: "1" },
            { id: "2", data: "2" },
          ]}
        />
        <button>Submit files</button>
      </section>
    </Modal>
  );
}
