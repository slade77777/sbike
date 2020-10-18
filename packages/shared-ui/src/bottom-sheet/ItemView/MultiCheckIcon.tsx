import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '../../Colors';
import Icon from '../../Icon/Icon';

type Props = {
  select?: boolean;
};

// MARK: - SubViews
const MultiCheckIcon: React.FC<Props> = ({select = false}) => {
  const additionalStyle = {
    backgroundColor: select ? Colors.blue500 : Colors.white400,
    borderColor: select ? Colors.white400 : Colors.gray300,
    borderWidth: select ? 0 : 2,
  };
  return (
    <View style={[styles.container, additionalStyle]}>
      {select && (
        <Icon name="checkSelection" color={Colors.white400} size={12} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
});

export default MultiCheckIcon;
