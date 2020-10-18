import React, {useEffect} from 'react';
import {RouteProp} from '@react-navigation/native';
import {Text, View, StyleSheet, Image, ScrollView} from 'react-native';
import {Button, Colors, L1_Bold, L2, L3} from 'shared-ui';
import {SafeAreaView} from 'react-native-safe-area-context';
import {agentDetailsActions, StoreState} from 'shared-logic';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {MainStackParamList} from '../../RootNavigator';
import LoadingView from '../../components/LoadingView';
import EmptyStateActionView from '../../components/EmptyStateActionView';
import OnSaleProjectList from './OnSaleProjectList';

type Props = {
  route: RouteProp<MainStackParamList, 'AgentDetails'>;
};

const AgentDetails: React.FC<Props> = (props) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {id} = props.route.params;

  useEffect(() => {
    dispatch(agentDetailsActions.fetchAgentDetails(id));
    return () => {
      dispatch(agentDetailsActions.resetAgentDetails());
    };
  }, [dispatch, id]);

  const {isFetchingAgent, agent, error} = useSelector((state: StoreState) => ({
    isFetchingAgent: state.agentDetails.loading,
    agent: state.agentDetails.agent,
    error: state.agentDetails.error,
  }));

  if (isFetchingAgent) {
    return <LoadingView />;
  }

  if (error) {
    return <EmptyStateActionView title={error.code} subTitle={error.message} />;
  }

  if (!agent) {
    return null;
  }

  return (
    <SafeAreaView edges={['bottom']} style={styles.safeView}>
      <ScrollView>
        <Image
          style={styles.profileImage}
          source={{uri: agent.avatarUrl}}
          accessibilityIgnoresInvertColors
          resizeMode="contain"
        />
        <View style={styles.agentBio}>
          <L1_Bold style={styles.agentName} numberOfLines={1}>
            {agent.name}
          </L1_Bold>
          <L3 style={styles.jobTitle} numberOfLines={1}>
            {t('screens.agents.agents')}
          </L3>
          <View style={styles.divider} />
          <View style={styles.agentCode}>
            <L2 style={styles.title} numberOfLines={2}>
              {t('screens.agentDetails.code')}
            </L2>
            <L2>{agent.code}</L2>
          </View>
          <View style={styles.agentAddress}>
            <L2 style={styles.title} numberOfLines={1}>
              {t('common.address')}
            </L2>
            <L2>{agent.address.address}</L2>
          </View>
          <View style={styles.divider} />
          <L1_Bold style={styles.agentName} numberOfLines={1}>
            {t('screens.agentDetails.introTitle')}
          </L1_Bold>
          <Text style={styles.introduction}>{agent.description}</Text>
          <View style={styles.divider} />
          <L1_Bold style={styles.sellingProjectTitle} numberOfLines={1}>
            {t('screens.agentDetails.onSaleProjectTitle')}
          </L1_Bold>
          <OnSaleProjectList projects={agent.projects ?? []} />
        </View>
      </ScrollView>
      <View>
        <View style={styles.bottomDivider} />
        <Button
          onPress={() => {}}
          type="contained"
          style={styles.askMeButton}
          title={t('screens.agentDetails.ask')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: '100%',
    height: 250,
    marginBottom: 16,
  },
  agentBio: {
    marginHorizontal: 20,
  },
  agentName: {
    marginBottom: 8,
  },
  title: {
    width: '20%',
    color: Colors.gray400,
  },
  jobTitle: {
    color: Colors.gray400,
  },
  agentCode: {
    flexDirection: 'row',
    marginBottom: 18,
  },
  agentAddress: {
    flexDirection: 'row',
  },
  divider: {
    backgroundColor: Colors.gray300,
    height: 1,
    width: '100%',
    marginVertical: 24,
  },
  sellingProjectTitle: {
    marginBottom: 24,
  },
  introduction: {
    color: Colors.gray500,
    fontSize: 17,
    lineHeight: 28,
  },
  bottomDivider: {
    backgroundColor: Colors.gray300,
    height: 1,
    width: '100%',
  },
  safeView: {
    flex: 1,
    backgroundColor: Colors.white400,
  },
  askMeButton: {
    borderRadius: 8,
    height: 48,
    marginHorizontal: 13,
    marginVertical: 12,
    paddingVertical: 0,
    backgroundColor: Colors.blue500,
  },
});

export default AgentDetails;
