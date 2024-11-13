import React, {useState} from 'react';
import {Text} from 'react-native-paper';
import {View, TouchableOpacity} from 'react-native';

import {styles} from './styles';

// Dummy components for Quick Actions and Order History
// const QuickActions = () => ( <Text>Quick Actions Content</Text> );
// const OrderHistory = () => ( <Text>Order History Content</Text> );

const NavActions = () => {
  const [selectedAction, setSelectedAction] = useState('Quick Actions');
  const handlePress = (action: string) => {
    setSelectedAction(action);
  };
  return (
    <View>
      <View style={styles.navActionContainer}>
        <TouchableOpacity
          style={[
            styles.navAction,
            selectedAction === 'Quick Actions' && styles.selectedNavAction,
          ]}
          onPress={() => handlePress('Quick Actions')}>
          <Text variant="labelMedium">Quick Actions</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navAction,
            selectedAction === 'Order History' && styles.selectedNavAction,
          ]}
          onPress={() => handlePress('Order History')}>
          <Text variant="labelMedium">Order History</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.contentContainer}>
          {selectedAction === 'Quick Actions' && <QuickActions />}
          {selectedAction === 'Order History' && <OrderHistory />}
        </View> */}
    </View>
  );
};

export default NavActions;
