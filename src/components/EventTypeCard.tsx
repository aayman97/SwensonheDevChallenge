import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import FastImage from 'react-native-fast-image';
import MainText from './MainText';
import {ArrowRightIcon} from '../assets/svgs/SVGs';
import {useSelector} from 'react-redux';
import {State} from '../store/reducers/rootReducer';
import {getTheDataForEventCategory} from '../helper/getTheDataForEventCategory';
import {formattedNumber} from '../helper/formattedNumber';
import {getTheTotalSumOfEventItems} from '../helper/getTheTotalSumOfEventItems';

const {width, height} = Dimensions.get('screen');

type EventTypeCardProps = {
  eventCategory: EventCategory;
  index: number;
  onPress: () => void;
};

const EventTypeCard = ({index, eventCategory, onPress}: EventTypeCardProps) => {
  const eventsSelector = useSelector((state: State) => state.events);

  const addLeadingZero = useCallback((num: number | undefined) => {
    if (num) return num < 10 ? `0${num}` : `${num}`;
  }, []);
  //   useEffect(() => {
  //     getTheDataForEventCategory(eventsSelector, eventCategory.id);
  //   }, [eventsSelector]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          marginRight: index % 2 === 0 ? width * 0.03 : 0,
          borderColor:
            getTheDataForEventCategory(eventsSelector, eventCategory.id)
              .length > 0
              ? '#5DA3A9'
              : '#DFDACC',
          borderWidth:
            getTheDataForEventCategory(eventsSelector, eventCategory.id)
              .length > 0
              ? 2
              : 1,
        },
      ]}>
      <FastImage
        source={{
          uri: eventCategory.image,
        }}
        style={styles.imageContainer}
        resizeMode="cover"
      />

      <View style={styles.textAndArrowContainer}>
        <MainText
          fontWeight={'500'}
          fontFamily="Avenir-Regular"
          fontSize={18}
          color="black">
          {eventCategory.title}
        </MainText>

        <ArrowRightIcon />
      </View>

      {getTheDataForEventCategory(eventsSelector, eventCategory.id).length >
      0 ? (
        <View
          style={[styles.addOrSelectContainer, {backgroundColor: '#5DA3A9'}]}>
          <MainText color="white" fontSize={13} fontFamily="Avenir-Regular">
            {addLeadingZero(
              getTheDataForEventCategory(eventsSelector, eventCategory.id)
                ?.length,
            )}
          </MainText>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default React.memo(EventTypeCard);

const styles = StyleSheet.create({
  container: {
    width: width * 0.47,
    height: 150,
    borderRadius: 4,

    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 104,
  },
  textAndArrowContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 46,
    paddingHorizontal: 10,
  },
  addOrSelectContainer: {
    width: 26,
    height: 26,
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
