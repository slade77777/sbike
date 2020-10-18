import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '../Colors';
import SimpleButton from '../SimpleButton';
import {M_500_16_20} from '../typography/Typography';

type Props = {
  title?: string;
  doneButtonText?: string;
  onCloseHeader: () => void;
  doneButton?: boolean;
  onTapDone?: () => void;
};

// MARK: - SubViews
const Header: React.FC<Props> = React.memo(
  ({title, doneButton, onCloseHeader, doneButtonText, onTapDone}: Props) => {
    return (
      <View style={styles.container}>
        <View style={titleStyles.container}>
          <M_500_16_20 style={titleStyles.title} numberOfLines={1}>
            {title}
          </M_500_16_20>
        </View>
        <View style={styles.subView}>
          <SimpleButton
            imageName="close"
            onPress={onCloseHeader}
            styles={closeButtonStyle}
          />
          {doneButton && (
            <SimpleButton
              text={doneButtonText}
              onPress={onTapDone}
              styles={doneButtonStyle}
            />
          )}
        </View>
      </View>
    );
  },
);

const closeButtonStyle = {
  container: {
    height: 56,
    width: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    size: 18,
    color: Colors.black200,
  },
};

const doneButtonStyle = {
  container: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '500',
    color: Colors.blue500,
    marginRight: 16,
  },
};

const titleStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
    color: Colors.black500,
    marginLeft: 0,
    marginRight: 0,
  },
});

const styles = StyleSheet.create({
  container: {
    height: 56,
    width: '100%',
    backgroundColor: Colors.white400,
    flexDirection: 'row',
  },
  subView: {
    height: 56,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
  },
});

export default Header;
