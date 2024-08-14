import React from 'react';
import Svg, { Rect, Circle, Path } from 'react-native-svg';

const DoorWithGearsIcon = (props) => (
  <Svg width="100" height="50" viewBox="0 0 24 24" fill={props.color}>
    <Rect x="7" y="3" width="30" height="18" fill={props.color} stroke={props.color}strokeWidth="2"/>
    <Circle cx="16" cy="8" r="2" fill={props.color}/>
    <Circle cx="18" cy="10" r="1.5" fill={props.color}/>
  </Svg>
);

const GearsWithArrowsIcon = (props) => (
  <Svg width="100" height="100" viewBox="0 0 24 24" fill={props.color}>
    <Circle cx="12" cy="12" r="4" fill={props.color} stroke={props.color} strokeWidth="2"/>
    <Path d="M12 2L12 6" stroke={props.color} strokeWidth="2"/>
    <Path d="M12 18L12 22" stroke={props.color} strokeWidth="2"/>
    <Path d="M2 12L6 12" stroke={props.color} strokeWidth="2"/>
    <Path d="M18 12L22 12" stroke={props.color} strokeWidth="2"/>
  </Svg>
);

export { DoorWithGearsIcon, GearsWithArrowsIcon };
