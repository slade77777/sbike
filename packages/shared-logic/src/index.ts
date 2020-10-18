import {setApi, createApi} from './api';
export * from './redux/rootReducers';
import {useStore} from './redux/createStore';

export * from './hooks';
export * from './redux/postPropertySaleForm/actions';
export * from './utils/stringUtils';

import * as dateUtils from './utils/dateUtils';
export {dateUtils};

import * as apartmentActions from './redux/apartment/actions';
import * as projectActions from './redux/project/actions';
import * as galleryActions from './redux/gallery/actions';
import * as agentActions from './redux/agent/actions';
import * as agentDetailsActions from './redux/agentDetails/actions';
import * as postContactFormActions from './redux/postContactForm/actions';
import * as postPropertySaleFormActions from './redux/postPropertySaleForm/actions';
import * as articlesActions from './redux/article/actions';
import * as articlesCategoryActions from './redux/articleByCategory/actions';
import * as articlesTagActions from './redux/articleByTag/actions';
import * as articleLatestActions from './redux/articleLatest/actions';
import * as provinceActions from './redux/province/actions';
import * as eventActions from './redux/event/actions';
import * as postEventRegistrationFormActions from './redux/postEventRegistrationForm/actions';
export {apartmentActions};
export {projectActions};
export {galleryActions};
export {agentActions};
export {agentDetailsActions};
export {postContactFormActions};
export {postPropertySaleFormActions};
export {articlesActions};
export {articlesCategoryActions};
export {articlesTagActions};
export {articleLatestActions};
export {provinceActions};
export {eventActions};
export {postEventRegistrationFormActions};

export * from './types/apartment';
export * from './types/apartmentImage';
export * from './types/insideFacility';
export * from './types/outsideFacility';
export * from './types/project';
export * from './types/projectGallery';
export * from './types/promotion';
export * from './types/address';
export * from './types/galleryItem';
export * from './types/contactFormType';
export * from './types/article';
export * from './types/agent';
export * from './types/province';
export * from './types/response';
export * from './types/event';

// TODO should rewrite as a action on reducer ???
//export api call for agent
export * from './api/agent';
export * from './api/articles';
export * from './api/customerRequest';
export * from './api/project';

export function setupBusinessLayer(baseUrl: string) {
  const api = createApi(baseUrl);
  setApi(api);
}

export {useStore};
