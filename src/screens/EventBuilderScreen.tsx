import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import EventTypeCard from '../components/EventTypeCard';
import axios, {AxiosResponse, AxiosError} from 'axios';
import MainText from '../components/MainText';
import BaseUrl from '../networks/BaseUrl';
import Endpoints from '../networks/Endpoints';
import MainButton from '../components/MainButton';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {State} from '../store/reducers/rootReducer';
import {getTheDataForEventCategory} from '../helper/getTheDataForEventCategory';
import {formattedNumber} from '../helper/formattedNumber';

type EventBuilderScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EventBuilderScreen'
>;

interface EventBuilderScreenProps {
  navigation: EventBuilderScreenNavigationProp;
}

const EventBuilderScreen: React.FC<EventBuilderScreenProps> = ({
  navigation,
}) => {
  const [eventCategories, setEventCategories] = useState<
    [EventCategory] | [] | null
  >(null);

  const [loading, setLoading] = useState<boolean>(true);

  const eventsSelector = useSelector((state: State) => state.events);

  const renderItem = useCallback(
    ({item, index}: {item: EventCategory; index: number}) => {
      return (
        <EventTypeCard
          index={index}
          key={item.id}
          eventCategory={item}
          onPress={() => {
            navigation.navigate('EventItemScreen', {
              item: item,
            });
          }}
        />
      );
    },
    [],
  );

  useEffect(() => {
    axios
      .get(BaseUrl.dev + Endpoints.categories)
      .then((res: AxiosResponse<[EventCategory]>) => {
        setEventCategories(res.data);
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        console.log(err.message);
        setEventCategories([]);
        setLoading(false);
      });
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View style={styles.container}>
        <View style={{width: '100%', alignItems: 'center', marginTop: '10%'}}>
          <MainText fontWeight="800" fontFamily="Avenir-Bold" fontSize={25}>
            Event Builder
          </MainText>
          <MainText
            style={{
              textAlign: 'center',
              marginTop: 5,
            }}
            width={'70%'}
            fontSize={16}
            fontFamily="Avenir-Light">
            Add to your event to view our cost estimate.
          </MainText>
          <MainText
            style={{
              marginTop: '5%',
            }}
            fontWeight="800"
            fontFamily="Avenir-Bold"
            fontSize={30}>
            {getTheDataForEventCategory(eventsSelector, null).minBudget !== 0 &&
            getTheDataForEventCategory(eventsSelector, null).maxBudget !== 0
              ? `${formattedNumber(
                  getTheDataForEventCategory(eventsSelector, null)?.minBudget,
                )}-${formattedNumber(
                  getTheDataForEventCategory(eventsSelector, null)?.maxBudget,
                )}`
              : '-'}
          </MainText>
        </View>

        {loading ? (
          <ActivityIndicator size={'large'} color={'black'} />
        ) : (
          <FlatList
            data={eventCategories}
            renderItem={renderItem}
            numColumns={2}
            style={{
              width: '100%',
              maxHeight: '60%',
            }}
            ItemSeparatorComponent={() => {
              return (
                <View
                  style={{
                    height: 20,
                  }}
                />
              );
            }}
          />
        )}
        <MainButton
          onPress={() => {
            navigation.navigate('FinalScreen');
          }}
          style={styles.saveButtonContainer}
          disabled={
            getTheDataForEventCategory(eventsSelector, null).minBudget === 0 &&
            getTheDataForEventCategory(eventsSelector, null).maxBudget === 0
          }
          height={46}
          width={'100%'}>
          {loading ? (
            <ActivityIndicator size={'small'} color={'white'} />
          ) : (
            <MainText color="white">Save</MainText>
          )}
        </MainButton>
      </View>
    </SafeAreaView>
  );
};

export default EventBuilderScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  saveButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
