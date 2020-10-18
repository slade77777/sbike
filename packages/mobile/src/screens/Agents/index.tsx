import React, {useEffect} from 'react';
import {StyleSheet, FlatList, SafeAreaView, View} from 'react-native';
import {StoreState, agentActions, Agent} from 'shared-logic';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';
import {Colors} from 'components-library';
import ListHeader from '../../components/ListHeader';
import Divider from '../../components/Divider';
import {MainStackParamList} from '../../RootNavigator';
import AgentListItem from './AgentListItem';
import WhyUs from './WhyUs';

type Props = {
  navigation: StackNavigationProp<MainStackParamList>;
};

const Agents: React.FC<Props> = (props) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {agents, page, size, total} = useSelector<
    StoreState,
    {agents: Agent[]; page: number; size: number; total: number}
  >((state) => ({
    agents: state.agent?.agents,
    page: state.agent?.page,
    size: state.agent?.size,
    total: state.agent?.total,
  }));

  const pageSize = 6;

  useEffect(() => {
    dispatch(agentActions.fetchAgents(0, pageSize));
  }, [dispatch]);

  // TODO: this infinite scroll implementation is here only as example.
  // With content in a list footer it is not great idea from the UX perspective
  const handleEndReached = React.useCallback(() => {
    if ((page + 1) * size > total) {
      return;
    }

    dispatch(agentActions.fetchAgents(page + 1, pageSize));
  }, [dispatch, page, size, total]);
  const renderItem = ({item}: {item: Agent}) => {
    const id = item.id;
    return (
      <AgentListItem
        code={item?.code}
        name={item?.name}
        title={t('screens.agents.agents')}
        avatar={item.avatar_url}
        verified={true}
        onPress={() => props.navigation.push('AgentDetails', {id})}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeView}>
      {agents?.length > 0 && (
        <FlatList
          data={agents}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onEndReached={handleEndReached}
          ListHeaderComponent={
            <ListHeader
              title={t('screens.agents.agents')}
              subtitle={t('screens.agents.agentsDescription')}
            />
          }
          ListFooterComponent={
            <View style={styles.section}>
              <Divider />
              <WhyUs />
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    backgroundColor: Colors.white400,
  },
  section: {
    paddingVertical: 20,
  },
});

export default Agents;
