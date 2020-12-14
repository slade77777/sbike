import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

type Props = {
  keyboardType?: string;
  label?: string;
  style?: any;
  onChangeText?: (text: string) => void;
  other?: any;
};

const InputText: React.FC<Props> = ({
  keyboardType,
  label,
  style,
  onChangeText,
  other,
}) => {
  return (
    <View>
      <View style={styles.item}>
        <TextInput
          {...other}
          placeholder={label}
          placeholderTextColor={'grey'}
          onChangeText={(val) => onChangeText?.(val)}
          keyboardType={keyboardType}
          style={[
            style,
            {
              justifyContent: 'center',
              fontSize: 16,
              color: 'black',
              paddingHorizontal: 10,
              paddingVertical: 5,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    marginTop: 10,
    marginHorizontal: 15,
    backgroundColor: 'white',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
  },
  label: {
    fontSize: 11,
    color: '#6CAFA1',
  },
});

export default InputText;
