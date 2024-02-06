import {
  DimensionValue,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import React, {PropsWithChildren} from 'react';

interface MainButtonProps extends PropsWithChildren<{}> {
  style?: StyleProp<ViewStyle>;
  height?: DimensionValue;
  width?: DimensionValue;
  color?: string;
  borderRadius?: number;
  onPress: () => void;
  disabled?: boolean;
}
const MainButton: React.FC<MainButtonProps> = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.disabled}
      style={[
        props.style,
        {
          width: props.width,
          height: props.height,
          backgroundColor: props.color || '#5DA3A9',
          borderRadius: props.borderRadius || 5,
          opacity: props.disabled ? 0.5 : 1,
        },
      ]}>
      {props.children}
    </TouchableOpacity>
  );
};

export default MainButton;

const styles = StyleSheet.create({
  mainButtonContainer: {},
});
