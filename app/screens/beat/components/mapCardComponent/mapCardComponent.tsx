import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import {Text} from 'react-native-paper';
import CardWrapper from 'components/card/Card';

import styles from './mapCardComponent.style'
import CustomButton from '@/components/button/CustomButton';
import {ButtonTypes} from '@/types/buttons';

import PhoneImg from '../../../../../assets/icons/phoneGreenImg.svg'
import NavIconImg from '../../../../../assets/icons/NavIconImg.svg'

interface MapCardComponentProps {
    count: number;
    name: string;
    address: string;
    distance: string;
    time: string;
  }

function MapCardComponent({ count, name, address, distance, time }: MapCardComponentProps) {
  return (
        <CardWrapper cardStyle={styles.container}>
            <TouchableOpacity  onPress={() => {  }} >
                <View style={styles.infoContainer}>
                    <View style={styles.numberContainer}>
                        <Text style={styles.numberText}>{count}</Text>
                    </View>
                    <View style={styles.infoTextContainer}>
                        <Text variant='titleMedium' style={styles.nameText}>{name}</Text>
                        <Text variant='labelLarge' style={styles.addressText}>{address}</Text>
                    </View>
                    <TouchableOpacity style={styles.phoneimageContainer} 
                                      onPress={() => {  }}>
                                <PhoneImg />                      
                    </TouchableOpacity>
                </View>
                <View style={styles.detailsContainer}>
                    <View style={styles.navInfoContainer}>
                        <NavIconImg style={styles.navImg} />
                        <Text variant='labelLarge' style={styles.distanceTimeText}> {distance} | {time}</Text>
                        <TouchableOpacity onPress={() => { }}>
                        <Text variant='labelLarge' style={styles.navigationlinkText}>Start Navigation</Text>
                        </TouchableOpacity>
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

export default MapCardComponent;