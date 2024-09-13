import React, {ReactNode} from 'react';
import {List} from 'react-native-paper';
import {
  UIManager,
  LayoutAnimation,
  Platform,
  View,
  TextStyle,
  ViewStyle,
} from 'react-native';
import styles from './Accordion.style';
import {COLORS} from 'theme/colors';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface IAccordionProps {
  title: string | ReactNode;
  children: ReactNode;
  isExpanded?: boolean;
  headingStyle?: ViewStyle;
  titleStyle?: TextStyle;
  isWhiteAccordion?: boolean;
  leftComponent?: () => React.ReactNode;
}

const Accordion = ({
  title,
  children,
  headingStyle,
  titleStyle,
  leftComponent,
  isExpanded = false,
  isWhiteAccordion = false,
}: IAccordionProps) => {
  const [expanded, setExpanded] = React.useState(isExpanded);

  const handlePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(prev => !prev);
  };

  return (
    <List.Section>
      <List.Accordion
        theme={{colors: {background: COLORS.white}}}
        title={title}
        expanded={expanded}
        onPress={handlePress}
        left={leftComponent}
        titleStyle={[styles.titleStyle, titleStyle]}
        style={[
          styles.heading,
          {
            backgroundColor: COLORS.white,
          },
          headingStyle,
        ]}>
        <View style={styles.innerContainer}>{children}</View>
      </List.Accordion>
    </List.Section>
  );
};

export default Accordion;
