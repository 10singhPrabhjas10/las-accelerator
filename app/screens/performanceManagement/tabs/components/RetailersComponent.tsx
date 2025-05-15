import React, {ComponentType} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Share,
  Linking,
  Alert,
} from 'react-native';
import {Image} from 'react-native';
import type {IconProps} from 'react-native-vector-icons/Icon';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {commonStyles} from './styles/commonStyles';

const Feather = FeatherIcon as unknown as ComponentType<IconProps>;
type Retailer = {
  id: string;
  name: string;
  initials: string;
  email: string;
  avatar: string | null;
};

interface RetailersComponentProps {
  title?: string;
  dateLabel?: string;
  retailers: Retailer[];
  onViewAll?: () => void;
  onShare?: (retailer: Retailer) => void;
  onEmail?: (retailer: Retailer) => void;
}

const RetailersComponent = ({
  title = 'New Retailers',
  dateLabel = 'Feb 2024',
  retailers,
  onViewAll,
  onShare,
  onEmail,
}: RetailersComponentProps) => {
  const handleShare = (retailer: Retailer) => {
    if (onShare) {
      onShare(retailer);
    } else {
      Share.share({
        message: `Retailer: ${retailer.name}\nRetailer ID: #${retailer.id}`,
      });
    }
  };

  const handleEmail = (retailer: Retailer) => {
    if (onEmail) {
      onEmail(retailer);
    } else {
      Linking.openURL(
        `mailto:${retailer.email}?subject=Hello ${retailer.name}`,
      );
    }
  };

  const handleViewAll = () => {
    if (onViewAll) {
      onViewAll();
    } else {
      Alert.alert('View All Retailers', 'Navigate to all retailers screen!');
      //navigation.navigate('AllRetailers');
    }
  };

  const renderAvatar = (retailer: Retailer) => {
    if (retailer.avatar) {
      return (
        <View style={styles.avatarWrapper}>
          <Image source={{uri: retailer.avatar}} style={styles.avatarImg} />
        </View>
      );
    }
    return (
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{retailer.initials}</Text>
      </View>
    );
  };

  return (
    <View style={[commonStyles.card, styles.container]}>
      <View style={styles.headerRow}>
        <Text style={commonStyles.cardTitle}>{title}</Text>
        <View style={styles.dateBox}>
          <Text style={styles.dateText}>{dateLabel}</Text>
        </View>
      </View>
      <FlatList
        data={retailers}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.row}
            onPress={() => handleEmail(item)}>
            {renderAvatar(item)}
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.id}>Retailer ID #{item.id}</Text>
            </View>
            <TouchableOpacity style={styles.iconButton} onPress={() => handleShare(item)}>
              <Feather name="mail" size={24} color="#7A8D9C" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <TouchableOpacity onPress={handleViewAll}>
        <Text style={styles.viewAll}>View All Retailers</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F9F9',
    borderRadius: 8,
    padding: 8,
    marginVertical: 16,
    marginHorizontal: 0,
    elevation: 2,
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: '500',
    color: '#282C3B',
    marginLeft: 16,
  },
  dateBox: {
    backgroundColor: '#E6EDEE',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  dateText: {
    color: '#004F59',
    fontWeight: '400',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E3F0ED',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    marginLeft: 8,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#7A8D9C',
  },
  avatarWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    marginRight: 14,
  },
  avatarImg: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },
  id: {
    fontSize: 15,
    color: '#7A8D9C',
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: '#E3F0ED',
    marginVertical: 2,
  },
  viewAll: {
    color: '#3A7C3A',
    textAlign: 'center',
    marginTop: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
    fontSize: 17,
  },
  iconButton: {
    marginLeft: 4,
    padding: 12,
  },
});

export default RetailersComponent;
