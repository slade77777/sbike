import {DeviceSizes} from 'components-library';
import useMedia from './useMedia';

export enum SCREENS {
  DESKTOP = 'desktop',
  TABLET = 'tablet',
  MOBILE = 'mobile',
}

type Screens = {
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
};

export default function (): Screens {
  const screen = useMedia(
    [DeviceSizes.DESKTOP, DeviceSizes.TABLET, DeviceSizes.IPHONE_5],
    [SCREENS.DESKTOP, SCREENS.TABLET, SCREENS.MOBILE],
    '',
  );
  return {
    isDesktop: screen === SCREENS.DESKTOP || screen === null,
    isTablet: screen === SCREENS.TABLET,
    isMobile: screen === SCREENS.MOBILE,
  };
}
