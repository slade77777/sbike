import React, {useState, useMemo} from 'react';
import {
  View,
  StyleSheet,
  TextInput as NativeInput,
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  Keyboard,
} from 'react-native';
import {Colors} from '../Colors';
import SimpleButton from '../SimpleButton';
import {N_DEFAULT} from '../typography/Typography';
import {R_Normal_16_20} from '../typography/Typography';
import Header from './Header';
import ArrowDown, {ArrowOrientation} from './ArrowDown';
import CloseButton from './CloseButton';

// MARK: - Props
type Props = {
  text?: string;
  title?: string;
  placeholder?: string;
  errorMessage?: string | null;
  secure?: boolean;
  keyboardType?: KeyboardTypeOptions;
  returnKeyType?: ReturnKeyTypeOptions;
  selectionType?: boolean;
  onSelect?: () => void | null;
  editable?: boolean;
  onChangeText?: (value: string) => void;
  config?: {
    numOfLine?: number;
    size?: number;
    multiline?: boolean;
    maxLength?: number;
  };
  isRequired?: boolean;
};

// MARK: - Main View
const TextInput = ({
  text,
  title,
  placeholder,
  errorMessage,
  secure,
  keyboardType,
  returnKeyType = 'default',
  selectionType,
  onSelect,
  onChangeText,
  editable = true,
  isRequired = false,
  config = {numOfLine: 1, size: 48, multiline: false, maxLength: 500},
}: Props) => {
  const inputStyle = editable
    ? [styles.textInputEnable, config.multiline ? {height: '100%'} : {}]
    : styles.textInputDisable;

  const [isFocus, setIsFocus] = useState(false);

  const clearButtonVisible = useMemo(
    () =>
      config?.multiline === false &&
      text !== '' &&
      !selectionType &&
      editable &&
      isFocus,
    [config?.multiline, editable, text, isFocus, selectionType],
  );

  return (
    <View style={styles.container}>
      {title && (
        <Header text={title} disable={!editable} isRequired={isRequired} />
      )}
      <View
        style={[
          editable ? styles.body : styles.bodyDisable,
          {height: config.size},
        ]}>
        {!selectionType && editable && (
          <NativeInput
            style={inputStyle}
            textAlignVertical="top"
            placeholder={placeholder}
            defaultValue={text}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            secureTextEntry={secure ?? false}
            onChangeText={onChangeText}
            editable={!selectionType && editable}
            numberOfLines={config.numOfLine}
            multiline={config.multiline}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onSubmitEditing={Keyboard.dismiss}
            autoCorrect={false}
            maxLength={config.maxLength}
          />
        )}
        {clearButtonVisible && (
          <CloseButton
            size={18}
            onPress={() => {
              if (onChangeText) {
                onChangeText('');
              }
            }}
          />
        )}
        {(selectionType || !editable) && (
          <R_Normal_16_20
            style={editable ? styles.textInputEnable : styles.textInputDisable}
            numberOfLines={1}>
            {text}
          </R_Normal_16_20>
        )}
        {selectionType && editable === true && (
          <ArrowDown orientation={ArrowOrientation.bottom} />
        )}
        {selectionType && (
          <SimpleButton styles={buttonStyles} onPress={onSelect} />
        )}
      </View>
      {errorMessage && (
        <N_DEFAULT style={styles.errorMessage}>{errorMessage}</N_DEFAULT>
      )}
    </View>
  );
};

// MARK: - Styles
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  body: {
    borderColor: Colors.gray300,
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  bodyDisable: {
    borderRadius: 8,
    overflow: 'hidden',
    flexDirection: 'row',
    backgroundColor: Colors.inkS100,
  },
  textInputEnable: {
    fontSize: 16,
    fontWeight: 'normal',
    paddingLeft: 16,
    flex: 8,
    color: Colors.ink500,
    textAlign: 'left',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textInputDisable: {
    fontSize: 16,
    fontWeight: 'normal',
    paddingLeft: 16,
    flex: 8,
    color: Colors.ink400,
    textAlign: 'left',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  errorMessage: {
    fontSize: 13,
    fontWeight: 'bold',
    lineHeight: 16,
    color: Colors.red500,
    marginBottom: 0,
    marginTop: 8,
  },
});

const buttonStyles = {
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'absolute',
  },
};

export default TextInput;
