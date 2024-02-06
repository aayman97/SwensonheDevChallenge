import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import MainText from '../components/MainText';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ArrowLeftIcon} from '../assets/svgs/SVGs';
import axios, {AxiosResponse, AxiosError} from 'axios';
import BaseUrl from '../networks/BaseUrl';
import Endpoints from '../networks/Endpoints';
import EventItemCard from '../components/EventItemCard';
import {useDispatch, useSelector} from 'react-redux';
import {State} from '../store/reducers/rootReducer';
import {ActionTypes} from '../store/constants';
import {getTheTotalSumOfEventItems} from '../helper/getTheTotalSumOfEventItems';
import {formattedNumber} from '../helper/formattedNumber';

type EventItemScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EventItemScreen'
>;

type EventItemScreenRouteProp = RouteProp<
  RootStackParamList,
  'EventItemScreen'
>;

interface EventItemScreenProps {
  navigation: EventItemScreenNavigationProp;
  route: EventItemScreenRouteProp;
}

const EventItemScreen: React.FC<EventItemScreenProps> = ({
  route,
  navigation,
}) => {
  const {item} = route.params;

  const [eventItems, setEventItems] = useState<[EventItem] | [] | null>(null);

  const eventsSelector = useSelector((state: State) => state.events);

  const dispatch = useDispatch();

  const renderItem = useCallback(
    ({item, index}: {item: EventItem; index: number}) => {
      return (
        <EventItemCard
          index={index}
          key={item.id}
          eventItem={item}
          categoryID={route.params.item.id}
          onPress={() => {
            const newEvent = {
              categoryID: route.params.item.id,
              type: item,
            };

            dispatch({
              type: ActionTypes.ADDORDELETEEVENTCATEGORY,
              payload: newEvent,
            });
          }}
        />
      );
    },
    [],
  );

  useEffect(() => {
    axios
      .get(BaseUrl.dev + Endpoints.categoriesID(item.id))
      .then((res: AxiosResponse<[EventItem]>) => {
        setEventItems(res.data);
      })
      .catch((err: AxiosError) => {
        setEventItems([]);
      });
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View style={styles.container}>
        {/* Header with back button */}
        <View
          style={{
            width: '100%',
            paddingHorizontal: 10,
          }}>
          <TouchableOpacity
            style={styles.backButtonContainer}
            onPress={() => {
              navigation.goBack();
            }}>
            <ArrowLeftIcon />
          </TouchableOpacity>
        </View>

        {/* title and description */}
        <View style={{width: '100%', alignItems: 'center'}}>
          <MainText fontWeight="800" fontFamily="Avenir-Bold" fontSize={25}>
            {item.title}
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
            {getTheTotalSumOfEventItems(eventsSelector, item.id)
              ? `${formattedNumber(
                  getTheTotalSumOfEventItems(eventsSelector, item.id)
                    ?.minBudget,
                )}-${formattedNumber(
                  getTheTotalSumOfEventItems(eventsSelector, item.id)
                    ?.maxBudget,
                )}`
              : '-'}
          </MainText>
        </View>

        <View
          style={{
            width: '100%',
          }}>
          <FlatList
            data={eventItems}
            renderItem={renderItem}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 200,
            }}
            style={{
              width: '100%',
              marginTop: 30,
            }}
            ItemSeparatorComponent={() => {
              return (
                <View
                  style={{
                    height: 30,
                  }}
                />
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EventItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    // justifyContent: 'space-between',
    width: '100%',
  },
  backButtonContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
