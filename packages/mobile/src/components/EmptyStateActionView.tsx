import React from 'react';
import {View, StyleSheet, Image, ImageProps} from 'react-native';
import {
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {Colors, M_500_16_20, R_Normal_16_20} from 'shared-ui';

type Props = {
  title?: string;
  subTitle?: string;
  source?: ImageProps;
  actionText?: string;
  onActionClick?: () => void;
};

const EmptyStateActionView: React.FC<Props> = ({
  title,
  subTitle,
  source,
  actionText,
  onActionClick,
}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.root}>
        {source ? (
          <Image
            source={source}
            style={styles.image}
            accessibilityIgnoresInvertColors
          />
        ) : null}
        {title ? <M_500_16_20 style={styles.title}>{title}</M_500_16_20> : null}
        {subTitle ? (
          <R_Normal_16_20 style={styles.subTitle}>{subTitle}</R_Normal_16_20>
        ) : null}
        {actionText ? (
          <TouchableOpacity
            style={styles.actionContainer}
            onPress={onActionClick}>
            <M_500_16_20 style={styles.textAction}>{actionText}</M_500_16_20>
          </TouchableOpacity>
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white400,
  },
  image: {
    height: 240,
    width: 240,
  },
  title: {
    marginHorizontal: 40,
    textAlign: 'center',
    color: Colors.ink500,
  },
  subTitle: {
    marginHorizontal: 40,
    marginBottom: 24,
    textAlign: 'center',
    color: Colors.ink400,
    marginTop: 8,
  },
  actionContainer: {
    backgroundColor: Colors.blue100,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 48,
    marginTop: 12,
  },
  textAction: {
    color: Colors.primary500,
  },
});

export default EmptyStateActionView;
