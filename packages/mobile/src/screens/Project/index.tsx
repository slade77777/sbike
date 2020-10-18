import React, {useEffect} from 'react';
import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Colors, Button} from 'shared-ui';
import {
  agentActions,
  galleryActions,
  GalleryKind,
  Project,
  projectActions,
  ProjectGallery,
  StoreState,
} from 'shared-logic';
import {StackNavigationProp} from '@react-navigation/stack';
import DetailsNavigation, {Detail} from '../../components/DetailsNavigation';
import OnSaleBanner from '../../components/OnSaleBanner';
import Promotions from '../../components/Promotions';
import {MainStackParamList} from '../../RootNavigator';
import {ContactType} from '../ContactModal/ContactForm';
import ApartmentList from './ApartmentList';
import Facilities from './Facilities';

const galleryNavigationRoutes: {[id: string]: string} = {
  [GalleryKind.LOCATION]: 'Location',
  [GalleryKind.INSIDE_FACILITY]: 'Facilities',
  [GalleryKind.OVERVIEW]: 'Overview',
  [GalleryKind.PROGRESS]: 'Progress',
};

type SelectedProps = {
  project: Project | null;
  projectGalleries: ProjectGallery[];
};

const DEFAULT_FALLBACK = require('../../assets/fallback-desktop.jpg');

// The default findForProject has been changed to using a source code.
// Since we are displaying just Ocean Park for now, we set the default source code.
// FIXME: use proper code
const CODE_NAME = 'ocp';

type Props = {
  navigation: StackNavigationProp<MainStackParamList>;
};

const ProjectScreen: React.FC<Props> = (props) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const {project, projectGalleries} = useSelector<StoreState, SelectedProps>(
    (state) => ({
      project: state.project?.activeProject,
      projectGalleries: state.project?.activeProjectGalleries,
    }),
  );

  const findImage = (kind: GalleryKind, fallback = DEFAULT_FALLBACK) => {
    const image = projectGalleries.find(
      (gallery) => gallery.collection === kind,
    );
    return {uri: image?.hero_url} ?? fallback;
  };

  useEffect(() => {
    dispatch(projectActions.fetchActiveProject(CODE_NAME));
    dispatch(projectActions.fetchActiveProjectGalleries(CODE_NAME));
    dispatch(agentActions.fetchAgents(0, 6));
  }, [dispatch]);

  React.useEffect(() => {
    // TODO: this is copied from web but logic like this should be always iniside redux.
    // Using redux and keeping fetching/mapping logic outside of it doesn't make sense!
    projectGalleries.forEach((p) => {
      dispatch(
        // FIXME: use proper code
        galleryActions.fetchGalleryByCollectionName(CODE_NAME, p.collection),
      );
    });
  }, [dispatch, projectGalleries]);

  React.useEffect(() => {
    if (project?.id) {
      dispatch(projectActions.fetchActiveProjectOutside(project?.id));
    }
  }, [dispatch, project?.id]);

  if (!project || !projectGalleries) {
    // TODO: Display a 404 page for when the project is not found
    return <View />;
  }

  const heroImg = findImage(GalleryKind.MAIN);

  const details: Detail[] = [
    {
      collection: GalleryKind.OVERVIEW,
      hero_url: findImage(GalleryKind.OVERVIEW),
      text: t('screens.projectDetails.navigation.overview'),
    },
    {
      collection: GalleryKind.INSIDE_FACILITY,
      hero_url: findImage(GalleryKind.INSIDE_FACILITY),
      text: t('screens.projectDetails.navigation.inside'),
    },
    {
      collection: GalleryKind.PROGRESS,
      hero_url: findImage(GalleryKind.PROGRESS),
      text: t('screens.projectDetails.navigation.progress'),
    },
    {
      collection: GalleryKind.LOCATION,
      hero_url: findImage(GalleryKind.LOCATION),
      text: t('screens.projectDetails.navigation.location'),
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.heroContainer}>
        <ImageBackground style={styles.hero} source={heroImg} />
      </View>

      <DetailsNavigation
        details={details}
        onPress={(type) => {
          props.navigation.push('ProjectGallery', {
            screen: galleryNavigationRoutes[type],
          });
        }}
      />

      <OnSaleBanner
        address={project.address.address}
        saleStatus={t(
          `screens.projectDetails.saleStatus.${project.sale_status}`,
        )}
        name={project.name}
      />

      <Promotions promotions={project.project_promotions} />

      <ApartmentList projectId={project.id} />

      <Facilities project={project} />
      <Button
        style={styles.scheduleButton}
        title={t('screens.projectDetails.schedule')}
        type={'contained'}
        onPress={() =>
          props.navigation.push('ContactModal', {
            type: ContactType.PRIMARY_HOME_TOUR,
          })
        }
      />
      <Button
        style={styles.contactButton}
        title={t('screens.projectDetails.askForInfo')}
        onPress={() =>
          props.navigation.push('ContactModal', {
            type: ContactType.PRIMARY_ASK_QUESTION,
          })
        }
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white400,
  },
  heroContainer: {
    height: 292,
  },
  hero: {
    height: '100%',
  },
  scheduleButton: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  contactButton: {
    margin: 10,
  },
});

export default ProjectScreen;
