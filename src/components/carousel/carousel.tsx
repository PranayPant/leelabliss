import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import { ReactNode } from "react";
import { PrevButton, NextButton, usePrevNextButtons } from "./controls";
import styles from "./styles.module.css";

export interface CarouselProps {
  slides: { id: string; data: ReactNode }[];
  options?: EmblaOptionsType;
}

export function Carousel({ slides, options }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className={styles["embla"]}>
      <div className={styles["embla__viewport"]} ref={emblaRef}>
        <div className={styles["embla__container"]}>
          {slides.map(({ id, data }) => (
            <div className={styles["embla__slide"]} key={id}>
              <div className={styles["embla__slide__number"]}>{data}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles["embla__controls"]}>
        <div className={styles["embla__buttons"]}>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </div>
  );
}
