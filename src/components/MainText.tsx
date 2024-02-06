import {
  DimensionValue,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from 'react-native';
import React, {PropsWithChildren} from 'react';

type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

type FontFamily = 'Avenir-Regular' | 'Avenir-Light' | 'Avenir-Bold';

interface MainTextProps extends PropsWithChildren<{}> {
  style?: StyleProp<TextStyle>;
  fontSize?: number;
  fontWeight?: FontWeight;
  fontFamily?: FontFamily;
  width?: DimensionValue;
  numberOfLines?: number;
  color?: string | 'black';
}

const MainText: React.FC<MainTextProps> = props => {
  return (
    <Text
      numberOfLines={props.numberOfLines}
      style={[
        props.style,
        {
          fontSize: props.fontSize || 15,
          fontWeight: props.fontWeight || '500',
          fontFamily: props.fontFamily || 'Avenir-Regular',
          width: props.width,
          color: props.color || 'black',
        },
      ]}>
      {props.children}
    </Text>
  );
};

export default MainText;

const styles = StyleSheet.create({});
