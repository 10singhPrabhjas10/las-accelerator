import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

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
        <View style={styles.container}>
            <TouchableOpacity  onPress={() => {  }} >
                <View style={styles.infoContainer}>
                    <View style={styles.numberContainer}>
                        <Text style={styles.numberText}>{count}</Text>
                    </View>
                    <View style={styles.infoTextContainer}>
                        <Text style={styles.nameText}>{name}</Text>
                        <Text style={styles.addressText}>{address}</Text>
                    </View>
                    <TouchableOpacity style={styles.phoneimageContainer} 
                                      onPress={() => {  }}>
                                <PhoneImg />                      
                    </TouchableOpacity>
                </View>
                <View style={styles.detailsContainer}>
                    <View style={styles.navInfoContainer}>
                        <NavIconImg style={styles.navImg} />
                        <Text style={styles.distanceTimeText}> {distance} | {time}</Text>
                        <TouchableOpacity onPress={() => { }}>
                        <Text style={styles.navigationlinkText}>Start Navigation</Text>
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
        </View>
  );
}

export default MapCardComponent;