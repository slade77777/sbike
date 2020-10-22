// Mobile only exports
// FIXME: uncomment firebase (below) and make it an init function or move it to agent-mobile.
// Right now it is a singletone  that is created even for app without firebase
// In packages agent-mobile and agent-business-logic are a few more FIXME comments with code to uncomment
//
// export * from './firebase';
export {default as MultiCheckIcon} from './bottom-sheet/ItemView/MultiCheckIcon';
export {default as OneCheckItem} from './bottom-sheet/ItemView/OneCheckItem';
export {default as MultiSelectItem} from './bottom-sheet/ItemView/MultiSelectItem';
export {default as BottomSheetSingleItem} from './bottom-sheet/SingleChoice/SingleItem';
export {default as BottomSheet} from './bottom-sheet';
export {default as SingleChoiceBottomSheet} from './bottom-sheet/SingleChoice';
export {default as CustomizableBottomSheet} from './bottom-sheet/Customizable';
export {default as BaseBottomSheet} from './bottom-sheet/BaseBottomSheet';
export * from './bottom-sheet';
export * from './typography/Typography';
export {default as SnackbarTop} from './SnackbarTop';
export {SnackbarTopType} from './SnackbarTop';

// Common exports
export {default as Button} from './Button';
export {default as Provider} from './Provider';
export {default as Icon} from './Icon/Icon';
export {default as SearchInput} from './SearchInput';
export {default as IconsNavigation} from './IconsNavigation';
export {default as ArrowDown, ArrowOrientation} from './text-field/ArrowDown';
export {Colors} from './Colors';
export * from './typography/Typography';
export {default as TextInput} from './text-field';
export {default as Header} from './text-field/Header';
export {default as Tabbar} from './tabbar';
export {default as Badge} from './Badge';
export {default as Placeholder} from './Placeholder';
export {DeviceSizes} from './rwd/DeviceSizes';
export {Fonts} from './Fonts';
export {ContainerSizes} from './rwd/DeviceSizes';
export {default as RadioButton} from './RadioButton';
