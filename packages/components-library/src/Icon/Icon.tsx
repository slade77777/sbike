import React from 'react';
import {View} from 'react-native';
import {Colors} from '../Colors';
import AccessTime from './icons/AccessTime';
import AcnPlus from './icons/AcnPlus';
import AddGroup from './icons/AddGroup';
import ArrowLeft from './icons/ArrowLeft';
import ArrowRight from './icons/ArrowRight';
import Article from './icons/Article';
import AsteriskIcon from './icons/Asterisk';
import BackAndroidIcon from './icons/BackAndroid';
import Back from './icons/Back';
import CallIcon from './icons/Call';
import Chat from './icons/Chat';
import CheckSelection from './icons/CheckSelection';
import CheckShield from './icons/CheckShield';
import ClearTextInput from './icons/ClearTextInput';
import Clipboard from './icons/Clipboard';
import ClockIcon from './icons/Clock';
import CloseCircular from './icons/CloseCircular';
import Close from './icons/Close';
import CloseOutline from './icons/CloseOutline';
import CreateOrder from './icons/CreateOrder';
import Dissatisfied from './icons/Dissatisfied';
import DollarHome from './icons/DollarHome';
import Done from './icons/DoneIcon';
import DoneOutline from './icons/DoneIconOutline';
import Error from './icons/ErrorIcon';
import Event from './icons/Event';
import Facebook from './icons/Facebook';
import File from './icons/File';
import Filter from './icons/Filter';
import Filters from './icons/Filters';
import Google from './icons/Google';
import Guest from './icons/Guest';
import Home from './icons/Home';
import HomePlaceholder from './icons/HomePlaceholder';
import InfoIcon from './icons/InfoIcon';
import Instagram from './icons/Instagram';
import List from './icons/List';
import Loan from './icons/Loan';
import LocationCity from './icons/LocationCity';
import Logo from './icons/Logo';
import Man from './icons/Man';
import MapFill from './icons/MapFill';
import Map from './icons/Map';
import Menu from './icons/Menu';
import MoreAction from './icons/MoreAction';
import NotificationIcon from './icons/Notification';
import Overload from './icons/Overload';
import PhoneIcon from './icons/PhoneIcon';
import PhoneOutlined from './icons/PhoneOutlined';
import PhotoMatrixIcon from './icons/PhotoMatrix';
import PhotoSlidesIcon from './icons/PhotoSlides';
import Play from './icons/Play';
import PlusCircle from './icons/PlusCircle';
import Plusminus from './icons/Plusminus';
import PlusRectange from './icons/PlusRectange';
import Printer from './icons/Printer';
import ProfileIcon from './icons/Profile';
import Question from './icons/Question';
import SatisfiedAlt from './icons/SatisfiedAlt';
import Satisfied from './icons/Satisfied';
import Search from './icons/Search';
import Share from './icons/Share';
import TimeLapse from './icons/TimeLapse';
import Transaction from './icons/Transaction';
import Verified from './icons/Verified';
import Warning from './icons/WarningIcon';
import WarningRoundIcon from './icons/WarningRoundIcon';
import Woman from './icons/Woman';
import Youtube from './icons/Youtube';
import LockIcon from './icons/Lock';
import BookedIcon from './icons/Booked';
import OpenCartIcon from './icons/OpenCart';
import ArrowRightRound from './icons/ArrowRightRound';
import Ticket from './icons/Ticket';
import Block from './icons/Block';
import Apartment from './icons/Apartment';
import Project from './icons/Project';

type Props = {
  name: string;
  color?: string;
  size?: number;
  style?: any;
};

// Perhaps we should keep it sorted alphabetically? Or have some kind of knowledge base/repo/wiki regarding the icons?
const icons: {[name: string]: React.ComponentType<any>} = {
  'add-group': AddGroup,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'arrow-right-round': ArrowRightRound,
  'close-circular': CloseCircular,
  'dollar-home': DollarHome,
  'home-placeholder': HomePlaceholder,
  'phone-outlined': PhoneOutlined,
  accessTime: AccessTime,
  acnPlus: AcnPlus,
  article: Article,
  asterisk: AsteriskIcon,
  back: Back,
  backAndroid: BackAndroidIcon,
  call: CallIcon,
  chat: Chat,
  checkSelection: CheckSelection,
  checkShield: CheckShield,
  clearTextInput: ClearTextInput,
  clipboard: Clipboard,
  clock: ClockIcon,
  close: Close,
  closeOutline: CloseOutline,
  createOrder: CreateOrder,
  dissatisfied: Dissatisfied,
  done: Done,
  doneOutline: DoneOutline,
  error: Error,
  event: Event,
  facebook: Facebook,
  file: File,
  filter: Filter,
  filters: Filters,
  google: Google,
  guest: Guest,
  home: Home,
  info: InfoIcon,
  instagram: Instagram,
  list: List,
  loan: Loan,
  locationCity: LocationCity,
  logo: Logo,
  man: Man,
  map: Map,
  mapFill: MapFill,
  menu: Menu,
  more: MoreAction,
  notification: NotificationIcon,
  overload: Overload,
  phone: PhoneIcon,
  photoMatrixIcon: PhotoMatrixIcon,
  photoSlidesIcon: PhotoSlidesIcon,
  play: Play,
  plusCircle: PlusCircle,
  plusminus: Plusminus,
  plusRectange: PlusRectange,
  printer: Printer,
  profileIcon: ProfileIcon,
  question: Question,
  satisfied: Satisfied,
  satisfiedAlt: SatisfiedAlt,
  search: Search,
  share: Share,
  timeLapse: TimeLapse,
  transaction: Transaction,
  verified: Verified,
  warning: Warning,
  warningRound: WarningRoundIcon,
  woman: Woman,
  youtube: Youtube,
  lock: LockIcon,
  booked: BookedIcon,
  openCart: OpenCartIcon,
  ticket: Ticket,
  block: Block,
  apartment: Apartment,
  project: Project,
};

const Icon = ({name, color, size, style}: Props) => {
  const IconBody = icons[name];
  return (
    <View style={[style, iconStyles.container]}>
      {IconBody ? <IconBody color={color} size={size} /> : null}
    </View>
  );
};

Icon.defaultProps = {
  name: '',
  color: Colors.gray400,
  size: 24,
};

const iconStyles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default Icon;
