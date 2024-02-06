import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import MainText from '../components/MainText';
import {useSelector} from 'react-redux';
import {State} from '../store/reducers/rootReducer';
import {getTheDataForEventCategory} from '../helper/getTheDataForEventCategory';
import {formattedNumber} from '../helper/formattedNumber';
import {BlackStarIcon} from '../assets/svgs/SVGs';

type FinalScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'FinalScreen'
>;

interface FinalScreenProps {
  navigation: FinalScreenNavigationProp;
}
const FinalScreen: React.FC<FinalScreenProps> = ({navigation}) => {
  const eventsSelector = useSelector((state: State) => state.events);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.middleCircle}>
        <MainText fontSize={18} fontWeight="800">
          Event Saved!
        </MainText>

        <MainText
          style={{
            marginTop: '5%',
            textAlign: 'center',
          }}
          fontWeight="800"
          fontFamily="Avenir-Bold"
          width={'120%'}
          fontSize={38}>
          {getTheDataForEventCategory(eventsSelector, null).minBudget !== 0 &&
          getTheDataForEventCategory(eventsSelector, null).maxBudget !== 0
            ? `${formattedNumber(
                getTheDataForEventCategory(eventsSelector, null)?.minBudget,
              )}-${formattedNumber(
                getTheDataForEventCategory(eventsSelector, null)?.maxBudget,
              )}`
            : '-'}
        </MainText>
        <BlackStarIcon />
      </View>
    </SafeAreaView>
  );
};

export default FinalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAF9F8',
  },
  middleCircle: {
    width: 245,
    height: 245,
    borderRadius: 245,
    bottom: 100,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
});
