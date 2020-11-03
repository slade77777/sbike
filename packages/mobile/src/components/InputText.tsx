import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

type Props = {
  keyboardType?: string,
  label?: string,
  style?: any,
  onChangeText?: (text: string) => void,
  other?: any
}

const InputText : React.FC<Props> = ({keyboardType, label, style, onChangeText, other}) => {
  return (
    <View>
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white', marginHorizontal: 15}}>
        {label}
      </Text>
      <View style={styles.item}>
        <TextInput
          {...other}
          onChangeText={(val) => onChangeText && onChangeText(val)}
          keyboardType={keyboardType}
          style={[style, {justifyContent: 'center', fontSize: 16, color: 'black', paddingHorizontal: 10, paddingVertical: 5}]}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    marginTop: 10,
    marginHorizontal: 15,
    backgroundColor: 'white',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center'
  },
  label: {
    fontSize: 11,
    color: '#6CAFA1'
  }
});

export default InputText;