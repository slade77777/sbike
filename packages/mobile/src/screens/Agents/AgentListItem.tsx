import React, {FC} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Button, Colors, L3, L3_Bold, L4} from 'components-library';
import {useTranslation} from 'react-i18next';
import Card from '../../components/Card';
const placeholder = require('../../assets/fallback-desktop.jpg');

type Props = {
  avatar?: string;
  name: string;
  code: string;
  title: string;
  verified?: boolean;
  onPress?: () => void;
};

const AgentListItem: FC<Props> = ({
  avatar,
  name,
  code,
  title,
  verified,
  onPress,
}) => {
  const {t} = useTranslation();
  return (
    <>
      <Card
        onPress={onPress}
        style={styles.container}
        coverPhoto={avatar ? {uri: avatar} : placeholder}
        title={() => (
          <>
            <L3_Bold>{name}</L3_Bold>
            <L3>
              {t('screens.agents.agentCode')}:
              <L3 style={styles.agentCode}> #{code}</L3>
            </L3>
          </>
        )}
        description={() => (
          <>
            <L4>{title}</L4>
            <View style={styles.askMeContainer}>
              <Button
                style={styles.askMeButton}
                title={t('screens.agents.ask')}
                onPress={onPress}
                type="text"
                rightIconName="arrow-right"
              />
            </View>
          </>
        )}
      />
      {verified && (
        <Image
          source={require('../../assets/verified.png')}
          style={styles.verifiedIcon}
          accessibilityIgnoresInvertColors
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  agentCode: {color: Colors.gray500, marginLeft: 4},
  askMeContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  askMeButton: {
    paddingRight: 0,
  },
  verifiedIcon: {
    position: 'absolute',
    top: 15,
    right: 20,
    width: 25,
    height: 25,
  },
});

export default AgentListItem;
