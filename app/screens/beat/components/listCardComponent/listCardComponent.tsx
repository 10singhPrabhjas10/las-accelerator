import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

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
        <View style={styles.container}>
            <TouchableOpacity>
                <View style={styles.infoContainer}>
                    <View style={styles.imageContainer}>
                        {image ? 
                            (   <Image style={styles.image} source={typeof image === 'string' ? { uri: image } : image} />  ) : 
                            (   <UserProfileImg width={32} height={32} /> )
                        }                        
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
                    <View>
                        <NavIconImg style={styles.navImg} />
                        <Text style={styles.distanceTimeText}>{distance} | {time}</Text>
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

export default ListCardComponent;