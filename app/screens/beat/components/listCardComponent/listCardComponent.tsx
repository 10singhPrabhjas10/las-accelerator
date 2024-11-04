import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import {Text} from 'react-native-paper';
import CardWrapper from 'components/card/Card';

import styles from './listCardComponent.style'
import CustomButton from '@/components/button/CustomButton';
import {ButtonTypes} from '@/types/buttons';

import UserProfileImg from '../../../../../assets/icons/UserDefaultImg.svg';
import PhoneImg from '../../../../../assets/icons/phoneGreenImg.svg'
import NavIconImg from '../../../../../assets/icons/NavIconImg.svg'

interface ListCardComponentProps {
    image: string;
    name: string;
    address: string;
    distance: string;
    time: string;
  }

function ListCardComponent({ image, name, address, distance, time }: ListCardComponentProps) {
  return (
        <CardWrapper cardStyle={styles.container}>
            <TouchableOpacity>
                <View style={styles.infoContainer}>
                    <View style={styles.imageContainer}>
                        {image ? 
                            (   <Image style={styles.image} source={typeof image === 'string' ? { uri: image } : image} />  ) : 
                            (   <UserProfileImg width={32} height={32} /> )
                        }                        
                    </View>
                    <View style={styles.infoTextContainer}>
                        <Text variant='titleMedium' style={styles.nameText}>{name}</Text>
                        <Text variant='labelLarge'style={styles.addressText}>{address}</Text>
                    </View>
                    <TouchableOpacity style={styles.phoneimageContainer} 
                                      onPress={() => {  }}>
                                <PhoneImg />                      
                    </TouchableOpacity>
                </View>
                <View style={styles.detailsContainer}>
                    <View>
                        <NavIconImg style={styles.navImg} />
                        <Text variant='labelLarge' style={styles.distanceTimeText}>{distance} | {time}</Text>
                    </View>
                    <CustomButton
                        type={ButtonTypes.outline}
                        text="Check In"
                        style={styles.checkInButton}
                        textStyle={styles.checkInButtonText}
                        onPress={() => {  }}
                    />
                </View>
            </TouchableOpacity>
        </CardWrapper>
  );
}

export default ListCardComponent;