import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback} from 'react';
import FastImage from 'react-native-fast-image';
import MainText from './MainText';
import {PlusIcon, RightCheckIcon} from '../assets/svgs/SVGs';
import {useSelector} from 'react-redux';
import {State} from '../store/reducers/rootReducer';
import {checkIfArrayContainsObject} from '../helper/checkIfArrayContainsObject';
import {formattedNumber} from '../helper/formattedNumber';

const {width, height} = Dimensions.get('screen');
type EventItemCardProps = {
  eventItem: EventItem;
  index: number;
  onPress: () => void;
  categoryID: EventCategory['id'];
};
const EventItemCard = ({
  index,
  eventItem,
  onPress,
  categoryID,
}: EventItemCardProps) => {
  const eventsSelector = useSelector((state: State) => state.events);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {marginRight: index % 2 === 0 ? width * 0.03 : 0},
      ]}>
      <FastImage
        source={{
          uri: eventItem.image,
        }}
        style={styles.imageContainer}
        resizeMode="cover"
      />

      <View style={styles.detailsContainer}>
        <MainText color="#616161" fontFamily="Avenir-Regular" fontSize={16}>
          {eventItem.title}
        </MainText>

        <MainText
          fontFamily="Avenir-Regular"
          fontSize={18}
          fontWeight="600"
          style={{marginTop: 5}}>
          {formattedNumber(eventItem.minBudget)}-
          {formattedNumber(eventItem.maxBudget)}
        </MainText>
      </View>

      <View
        style={[styles.addOrSelectContainer, {backgroundColor: '#00000090'}]}>
        {checkIfArrayContainsObject(eventsSelector, {
          categoryID,
          type: eventItem,
        }) ? (
          <RightCheckIcon />
        ) : (
          <PlusIcon />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default EventItemCard;

const styles = StyleSheet.create({
  container: {
    width: width * 0.46,
    height: 180,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#DFDACC',
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 104,
  },
  detailsContainer: {
    padding: 10,
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
