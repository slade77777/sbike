import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, H2} from 'components-library';
import {Project} from 'shared-logic';
import {useTranslation} from 'react-i18next';

type Props = {
  project: Project;
};

const Facilities: React.FC<Props> = ({project}) => {
  const {t} = useTranslation();
  const {inside_facilities: projectFacilities} = project;

  const mainInfo = [
    {title: 'investor', content: project.constructor},
    {title: 'totalArea', content: `${project.total_area} ㎡`},
    {title: 'density', content: `${project.building_density}%`},
    {
      title: 'constructionDate',
      content: new Date(project.construct_date).getFullYear(),
    },
  ];

  const withPrioritiesList = projectFacilities.filter((a) => a.priority) ?? [];
  const withoutPrioritiesList =
    projectFacilities.filter((a) => !a.priority) ?? [];

  const withPriorities = withPrioritiesList.sort((a, b) => {
    return a.priority - b.priority;
  });
  const withoutPriorities = withoutPrioritiesList.sort((a, b) => {
    return a.name > b.name ? 1 : -1;
  });

  const facilities = withPriorities
    .concat(withoutPriorities)
    .map((a) => a.name);

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <H2 style={styles.title}>
          {t('screens.projectDetails.facilities.mainInfo.title')}
        </H2>
        {mainInfo.map((info) => (
          <View key={info.title} style={styles.mainInfoContainer}>
            <Text style={styles.mainInfoTitle}>
              {t(`screens.projectDetails.facilities.mainInfo.${info.title}`)}
            </Text>

            <Text style={styles.mainInfoContent}>{info.content}</Text>
          </View>
        ))}
      </View>

      <View style={styles.subContainer}>
        <H2 style={styles.title}>
          {t('screens.projectDetails.facilities.facilitiesAroundTitle')}
        </H2>
        {facilities.slice(0, 4).map((facility, idx) => (
          <Text key={`facility-${idx}`} style={styles.facilityText}>
            •&nbsp; {facility}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
  subContainer: {
    paddingVertical: 24,
    borderColor: Colors.gray300,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  mainInfoContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  mainInfoTitle: {
    fontSize: 16,
    color: Colors.gray400,
  },
  mainInfoContent: {
    flex: 1,
    textAlign: 'right',
    fontSize: 16,
  },
  facilityText: {
    fontSize: 16,
    marginBottom: 16,
  },
});
export default Facilities;
