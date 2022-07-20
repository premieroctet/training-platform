import { useMediaQuery } from "@chakra-ui/media-query";
import { useWindowSize } from "@react-hook/window-size/throttled";

export default function useSlideRatioStyle() {
  const [isLandscape] = useMediaQuery("(orientation: landscape)");
  const [width, height] = useWindowSize({ fps: 15 });
  const ratio = isLandscape ? 4 / 3 : 3 / 4;
  const slideWidth = isLandscape ? `${height * ratio}px` : "100%";
  const slideHeight = isLandscape ? "100%" : `${width * ratio}px`;

  return { isLandscape, slideWidth, slideHeight, ratio };
}
