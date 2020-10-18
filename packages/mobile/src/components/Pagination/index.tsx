import {Colors, L3, L3_Bold} from 'components-library';
import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';

type Props = {
  currentPage: number;
  itemsPerPage: number;
  itemsAmount: number;
  onPageChange: (newPage: number) => void;
};

const Pagination: React.FC<Props> = ({
  currentPage,
  itemsPerPage,
  itemsAmount,
  onPageChange,
}) => {
  const numOfPages = Math.ceil(itemsAmount / itemsPerPage);
  const pageNumbers = new Array(numOfPages)
    .fill(null)
    .map((_el, idx) => idx + 1);

  const handlePreviousClick = () => onPageChange(currentPage - 1);
  const handleNextClick = () => onPageChange(currentPage + 1);
  const handlePageClick = (page: number) => onPageChange(page);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handlePreviousClick}>
        <View style={styles.arrowContainer}>
          <View style={[styles.arrow, styles.arrowLeft]} />
        </View>
      </TouchableWithoutFeedback>
      {pageNumbers.map((number) =>
        number === currentPage ? (
          <View style={styles.currentPage} key={`page-number-${number}`}>
            <L3_Bold style={styles.currentPageNumber}>{number}</L3_Bold>
          </View>
        ) : (
          <L3
            key={`page-number-${number}`}
            onPress={() => handlePageClick(number)}>
            {number}
          </L3>
        ),
      )}
      <TouchableWithoutFeedback onPress={handleNextClick}>
        <View style={styles.arrowContainer}>
          <View style={[styles.arrow, styles.arrowRight]} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  arrowContainer: {
    width: 32,
    height: 32,
    borderWidth: 0.5,
    borderColor: Colors.gray300,
    borderRadius: 16,
    position: 'relative',
  },
  arrow: {
    position: 'absolute',
    width: 11,
    height: 11,
    borderLeftWidth: 1.5,
    borderBottomWidth: 1.5,
    top: 10,
  },
  arrowLeft: {
    left: 12,
    transform: [{rotate: '45deg'}],
  },
  arrowRight: {
    left: 8,
    transform: [{rotate: '-135deg'}],
  },
  currentPage: {
    backgroundColor: Colors.black500,
    height: 32,
    width: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentPageNumber: {
    color: Colors.white400,
  },
});

export default Pagination;
