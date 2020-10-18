import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Colors, Icon, SearchInput, L4} from 'components-library';

const PropertySearchBar: React.FC = () => {
  const handleFilterPress = () => {
    // TODO: implement me
  };

  return (
    <View style={styles.container}>
      <SearchInput />

      <TouchableOpacity onPress={handleFilterPress} style={styles.filter}>
        <Icon name="filters" size={12} color={Colors.blue500} />
        <L4 style={styles.filterText}>Filter</L4>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: Colors.white400,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.gray300,
  },
  filter: {
    flexDirection: 'row',
    marginLeft: 15,
  },
  filterText: {
    color: Colors.blue500,
  },
});

export default PropertySearchBar;
