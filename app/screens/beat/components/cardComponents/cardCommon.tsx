import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import CardWrapper from 'components/card/Card';

import styles from './cardCommon.style';
import CustomButton from '@/components/button/CustomButton';
import {ButtonTypes} from '@/types/buttons';

import PhoneImg from '@/../assets/icons/phoneGreenImg.svg'

interface CardCommonProps {
    infoContainer: JSX.Element;
    name: string;
    address: string;
    distance: string;
    time: string;
    detailsContainer: JSX.Element;
}

const CardCommon = ({ infoContainer, name, address, distance, time, detailsContainer }: CardCommonProps) => {
    return (
        <CardWrapper cardStyle={styles.container}>
            <TouchableOpacity>
                <View style={styles.infoContainer}>
                    {infoContainer}
                    <View style={styles.infoTextContainer}>
                        <Text variant='titleMedium' style={styles.nameText}>{name}</Text>
                        <Text variant='labelLarge' style={styles.addressText}>{address}</Text>
                    </View>
                    <TouchableOpacity style={styles.phoneimageContainer} onPress={() => { }}>
                        <PhoneImg />
                    </TouchableOpacity>
                </View>
                <View style={styles.detailsContainer}>
                    {detailsContainer}
                    <CustomButton
                        type={ButtonTypes.outline}
                        text="Check In"
                        style={styles.checkInButton}
                        textStyle={styles.checkInButtonText}
                        onPress={() => { }}
                    />
                </View>
            </TouchableOpacity>
        </CardWrapper>
    );
};

export default CardCommon;