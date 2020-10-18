import {ServerResponse} from '../types/response';
import {Project} from '../types/project';
import {ProjectGallery} from '../types/projectGallery';
import {GalleryItem} from '../types/galleryItem';
import {OutsideFacility} from '../types/outsideFacility';
import {Apartment} from '../types/apartment';
import {Agent} from '../types/agent';
import {ContactFormType} from '../types/contactFormType';
import {Article, ArticleTag, ArticleCategory} from '../types/article';
import {Province} from '../types/province';
import {Event} from '../types/event';

export interface ApiLayer {
  // project
  readProjects(): ServerResponse<Project[]>;
  readProject(id: string): ServerResponse<Project>;
  readProjectGalleries(projectId: string): ServerResponse<ProjectGallery[]>;
  readProjectOutsideFacilities(
    projectId: string,
  ): ServerResponse<OutsideFacility[]>;
  readAllApartmentsByProjectId(
    projectId: string,
  ): ServerResponse<OutsideFacility[]>;
  readGalleriesByCollectionName(
    projectId: string,
    collectionName: string,
  ): ServerResponse<GalleryItem[]>;

  // apartment
  readApartments(props?: {
    projectId?: string;
    marketType?: string;
    typeRooms?: string;
    isSample?: boolean;
  }): ServerResponse<Apartment[]>;
  readApartment(id: string): ServerResponse<Apartment>;
  readApartmentImages(id: string): ServerResponse<Apartment>;
  readSampleApartmentsByProjectId(
    projectId: string,
  ): ServerResponse<Apartment[]>;

  // agent
  readAgents(page: number, size: number): ServerResponse<Agent[]>;
  readAgentById(agentId: string): ServerResponse<Agent>;

  // customer-request
  sendContactForm(form: ContactFormType): ServerResponse<Response>;

  //Articles
  readArticle(id: string): ServerResponse<Article>;
  readArticleCategories(): ServerResponse<ArticleCategory[]>;
  readMostViewedArticles(): ServerResponse<Article[]>;
  readLatestArticles(page: number): ServerResponse<Article[]>;
  readFeatureNews(): ServerResponse<Article[]>;
  readArticlesByCategory({
    categoryId,
    page,
    pageSize,
  }: {
    categoryId: string;
    page: number;
    pageSize: number;
  }): ServerResponse<Article[]>;
  readArticlesByListTag({
    tagCodes,
    page,
    pageSize,
  }: {
    tagCodes: string[];
    page: number;
    pageSize: number;
  }): ServerResponse<Article[]>;
  readHotTags(): ServerResponse<ArticleTag[]>;

  // Province
  readProvinces(): ServerResponse<Province[]>;
  readProvinceDetails(id: string): ServerResponse<Province>;

  // Events
  readEvents(): ServerResponse<Event[]>;
  readEventById(id: string): ServerResponse<Event>;
  readEventByProjectId(projectId: string): ServerResponse<Event[]>;
}
