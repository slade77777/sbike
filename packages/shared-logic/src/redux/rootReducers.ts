import {combineReducers} from 'redux';
import project, {ProjectState} from './project/reducer';
import apartment, {ApartmentState} from './apartment/reducer';
import gallery, {GalleryState} from './gallery/reducer';
import agent, {AgentState} from './agent/reducer';
import article, {ArticleState} from './article/reducer';
import articleByCategory, {
  ArticleByCategoryState,
} from './articleByCategory/reducer';
import articleByTag, {ArticleByTagState} from './articleByTag/reducer';
import articleLatest, {ArticleLatestState} from './articleLatest/reducer';
import postContactForm, {PostContactFormState} from './postContactForm/reducer';
import agentDetails, {AgentDetailsState} from './agentDetails/reducer';
import postPropertySaleForm, {
  PostPropertySaleFormState,
} from './postPropertySaleForm/reducer';
import province, {ProvinceState} from './province/reducer';
import event, {EventState} from './event/reducer';
import postEventRegistrationForm, {
  PostEventRegistrationFormState,
} from './postEventRegistrationForm/reducer';

export default combineReducers({
  project,
  apartment,
  gallery,
  agent,
  agentDetails,
  postContactForm,
  postPropertySaleForm,
  article,
  articleLatest,
  articleByCategory,
  articleByTag,
  province,
  event,
  postEventRegistrationForm,
});

export type StoreState = {
  project: ProjectState;
  apartment: ApartmentState;
  gallery: GalleryState;
  agent: AgentState;
  agentDetails: AgentDetailsState;
  postContactForm: PostContactFormState;
  postPropertySaleForm: PostPropertySaleFormState;
  article: ArticleState;
  articleByCategory: ArticleByCategoryState;
  articleByTag: ArticleByTagState;
  articleLatest: ArticleLatestState;
  province: ProvinceState;
  event: EventState;
  postEventRegistrationForm: PostEventRegistrationFormState;
};
