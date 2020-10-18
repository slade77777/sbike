import React, {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '../Colors';
import Icon from '../Icon/Icon';
import {R_Normal_12_16} from '../typography/Typography';

type Props = {
  text?: string;
  disable?: boolean;
  isRequired?: boolean;
  noMargin?: boolean;
};

const Header: React.FC<Props> = ({
  text,
  disable = false,
  isRequired = false,
  noMargin = false,
}) => {
  const marginStyleText = useMemo(() => {
    return {
      marginTop: noMargin ? 8 : 16,
    };
  }, [noMargin]);
  const marginStyleIcon = useMemo(() => {
    return {marginTop: noMargin ? -5 : 0};
  }, [noMargin]);
  return (
    <View style={styles.container}>
      <R_Normal_12_16
        style={[disable ? styles.titleDisable : styles.title, marginStyleText]}
        numberOfLines={1}>
        {text}
      </R_Normal_12_16>
      {isRequired && (
        <Icon
          style={[styles.icon, marginStyleIcon]}
          name="asterisk"
          color={Colors.red500}
          size={6}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignContent: 'flex-start',
  },
  title: {
    color: Colors.black500,
    marginBottom: 8,
    marginTop: 16,
  },
  titleDisable: {
    color: Colors.ink400,
    marginBottom: 8,
    marginTop: 16,
  },
  icon: {
    marginLeft: 5,
  },
});

export default Header;
