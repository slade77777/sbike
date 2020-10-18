import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Divider} from 'react-native-paper';
import {Colors} from '../../Colors';
import Icon from '../../Icon/Icon';
import {R_Normal_16_20} from '../../typography/Typography';

type Props = {
  isSelected: boolean;
  data: string;
  onPress: (data: string) => void;
};

const SingleItem: React.FC<Props> = React.memo(
  ({isSelected, data, onPress}) => {
    return (
      <View style={styles.root}>
        <TouchableOpacity
          style={styles.container}
          onPress={() => onPress(data)}>
          <R_Normal_16_20
            style={[
              styles.title,
              {color: isSelected ? Colors.blue500 : Colors.black500},
            ]}>
            {data}
          </R_Normal_16_20>
          {isSelected && (
            <Icon
              name="checkSelection"
              color={Colors.blue500}
              size={16}
              style={styles.checkView}
            />
          )}
        </TouchableOpacity>
        <Divider accessibilityStates={[]} style={styles.divider} />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
  },
  divider: {marginLeft: 16, marginRight: 16},
  container: {
    backgroundColor: Colors.white400,
    height: 48,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    paddingLeft: 16,
    paddingRight: 16,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 'normal',
  },
  checkView: {
    width: 16,
    height: 16,
    marginRight: 16,
    marginLeft: 16,
  },
});

export default SingleItem;
