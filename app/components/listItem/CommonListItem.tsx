import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

interface CustomListItemProps {
  title: string;
  value: string;
  percentageChange?: string;
  isIncrease?: boolean;
  otherData?: React.ReactNode; // Add thi
  icon?: React.ReactNode;
}

const CustomListItem: React.FC<CustomListItemProps> = ({
  title,
  value,
  percentageChange,
  isIncrease,
  otherData,
  icon,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {icon && <View style={styles.iconStyle}>{icon}</View>}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      {otherData}
 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  iconStyle: {
    height: 40,
    width: 40,
    backgroundColor: '#EEEEEF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 12,
  },
  icon: {
    width: 24,
    height: 24,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  value: {
    fontSize: 14,
    color: '#666',
  },
  changeContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  increase: {
    color: 'green',
    fontSize: 14,
    fontWeight: '500',
  },
  decrease: {
    color: 'red',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default CustomListItem;
