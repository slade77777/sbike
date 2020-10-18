import React, {useEffect, useMemo} from 'react';
import {View, StyleSheet, Animated, Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {R_Normal_14_20} from '../src/typography/Typography';
import {Colors} from './Colors';
import Icon from './Icon/Icon';
export enum SnackbarTopType {
  NONE = 'NONE',
  DONE = 'DONE',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
}
type Props = {
  visibile: boolean;
  message: string;
  type?: SnackbarTopType;
  onSnackHide: () => void;
};

type SnackbarAttr = {
  backgroundColor: string;
  iconName: string;
};

const getNotchHeight = () => {
  let notchHeight = 0;
  if (Platform.OS === 'ios') {
    if (getStatusBarHeight() === 20) {
      notchHeight = 25;
    } else if (getStatusBarHeight() > 20) {
      notchHeight = getStatusBarHeight() + 34;
    }
  } else if (Platform.OS === 'android') {
    if (getStatusBarHeight() > 25) {
      notchHeight = 0;
    } else {
      notchHeight = getStatusBarHeight();
    }
  }
  return notchHeight;
};

const SnackBarTop = ({visibile, message, type, onSnackHide}: Props) => {
  const translatetAnim = new Animated.Value(-50);
  const fadeAnim = new Animated.Value(0);

  const snackbarAttrByType: SnackbarAttr = useMemo(() => {
    switch (type) {
      case SnackbarTopType.DONE:
        return {backgroundColor: Colors.green500, iconName: 'done'};
      case SnackbarTopType.ERROR:
        return {backgroundColor: Colors.red500, iconName: 'error'};
      case SnackbarTopType.WARNING:
        return {backgroundColor: Colors.orange500, iconName: 'warning'};
      default:
        return {backgroundColor: Colors.blue500, iconName: 'info'};
    }
  }, [type]);

  const startAnimation = () => {
    Animated.timing(translatetAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };
  const stopAnimation = () => {
    Animated.timing(translatetAnim, {
      toValue: -50,
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      onSnackHide();
    });
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };
  const transformStyle = {
    transform: [
      {
        translateY: translatetAnim,
      },
    ],
    opacity: fadeAnim,
  };

  useEffect(() => {
    if (visibile === true) {
      startAnimation();
      setTimeout(() => {
        stopAnimation();
      }, 2500);
    }
  }, [startAnimation, stopAnimation, visibile]);
  return visibile === true ? (
    <View style={styles.root}>
      <Animated.View style={[transformStyle]}>
        <View
          style={[
            styles.container,
            {backgroundColor: snackbarAttrByType.backgroundColor},
          ]}>
          <Icon
            name={snackbarAttrByType.iconName}
            size={18}
            color={Colors.white400}
          />
          <R_Normal_14_20 style={[styles.text]}>{message}</R_Normal_14_20>
        </View>
      </Animated.View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    position: 'absolute',
    top: 0,
  },
  container: {
    paddingHorizontal: 19,
    flexDirection: 'row',
    paddingTop: getNotchHeight() - getStatusBarHeight(),
  },
  text: {
    margin: 15,
    color: Colors.white400,
  },
});

export default SnackBarTop;
