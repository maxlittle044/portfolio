import { useMediaQuery } from "react-responsive";

function useDeviceSize ()  {
    const deviceSizes = {
        xsDown: useMediaQuery({ maxWidth: 575 }) || false,
        onlyxs: useMediaQuery({ minWidth: 576, maxWidth: 767 }) || false,
        xsUp: useMediaQuery({ minWidth: 576 }) || false,
        smDown: useMediaQuery({ maxWidth: 767 }) || false,
        onlySm: useMediaQuery({ minWidth: 768, maxWidth: 991 }) || false,
        smUp: useMediaQuery({ minWidth: 768 }) || false,
        mdDown: useMediaQuery({ maxWidth: 991 }) || false,
        onlyMd: useMediaQuery({ minWidth: 992, maxWidth: 1199 }) || false,
        mdUp: useMediaQuery({ minWidth: 992 }) || false,
        lgDown: useMediaQuery({ maxWidth: 1199 }) || false,
        lgUp: useMediaQuery({ minWidth: 1200 }) || false,
      };
  return deviceSizes;
}

export default useDeviceSize;