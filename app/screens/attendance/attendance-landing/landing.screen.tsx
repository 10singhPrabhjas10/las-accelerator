import React, {useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import {Text} from 'react-native-paper';
import {Formik, FormikProps, FormikHelpers} from 'formik';
import ImagePicker from 'react-native-image-crop-picker';

import Layout from 'components/Layout';
import {store} from 'store/redux/store';
import {updateIsAuthenticated} from 'store/redux/userSlice';

import ScreenHeader from '../../../components/headers/ScreenHeader';
import SubHeader from '../../../components/subHeader/subHeader';
import CustomRadioButton from '../../../components/radioButton/CustomRadioButton';
import CustomButton from '../../../components/button/CustomButton';
import DropDown from '../../../components/dropdown/Dropdown';
import ProfileSubHeader from '../../../components/profilesubHeader/profileSubHeader';

import {COLORS} from '../../../theme/colors';
import CalendarSvg from '../../../../assets/images/calendar.svg';
import CameraSvg from '../../../../assets/images/photo_camera.svg';
import {
  widthToRatio,
  heightToRatio,
  getCameraPermission,
  pickFromCamera,
} from '../../../utils/commonMethods';
import {ButtonTypes} from '../../../types/buttons';
import CommonStyles from '../../../utils/commonStyle';

interface AttendanceLandingScreenProps {
  title?: string;
}

interface FormValues {
  attendance: string;
  primaryTask: string;
  selfie: string;
}

const initialValues: FormValues = {attendance: '', primaryTask: '', selfie: ''};

export const AttendanceLandingScreen: React.FC<
  AttendanceLandingScreenProps
> = ({title = 'Gururaj Chandera'}) => {
  const [currentTask, setCurrentTask] = useState<number>(1);
  const [showTaskType, setShowTaskType] = useState<boolean>(false);
  const currentDate: string = '12/01/2024';

  const handleProceed = () => {
    if (currentTask < 3) setCurrentTask(currentTask + 1);
  };

  const handleSubmit = (
    values: FormValues,
    helpers: FormikHelpers<FormValues>,
  ) => {
    console.log(values);
    helpers.setSubmitting(false);
    store.dispatch(updateIsAuthenticated(true));
  };

  const takeSelfie = async (
    setFieldValue: (field: string, value: string) => void,
  ) => {
    try {
      const image = await pickFromCamera();
      setFieldValue('selfie', image.path);
    } catch (err) {
      console.log(err);
    }
  };

  const checkDisabled = (values: FormValues): boolean => {
    switch (currentTask) {
      case 1:
        return !values.attendance;
      case 2:
        return !values.primaryTask;
      case 3:
        return !values.selfie;
      default:
        return true;
    }
  };

  const renderTask = (
    values: FormValues,
    setFieldValue: (field: string, value: any) => void,
  ) => {
    switch (currentTask) {
      case 1:
        return (
          <CustomRadioButton
            title="1. Mark your attendance"
            onChange={val => setFieldValue('attendance', val)}
            value={values.attendance}
            isRequired
            data={[
              {value: 'present', label: 'Present'},
              {value: 'absent', label: 'Absent'},
            ]}
            containerStyle={styles.radioGroup}
            isVerticalButtons
            vrButtonContainerStyle={styles.vrButtonContainerStyle}
            labelStyle={styles.labelStyle}
          />
        );
      case 2:
        return (
          <DropDown
            value={values.primaryTask}
            list={[
              {value: '1', label: 'Retailing in the Market'},
              {value: '2', label: 'Task 2'},
              {value: '3', label: 'Task 3'},
              {value: '4', label: 'Task 4'},
            ]}
            label="2. Today's primary task"
            placeholder="Select Task"
            isRequired
            updateDisplayValue={value => value}
            visible={showTaskType}
            onChangeDropdownState={() => setShowTaskType(!showTaskType)}
            setValue={data => setFieldValue('primaryTask', data)}
          />
        );
      case 3:
        return (
          <View>
            <Text style={styles.taskTextStyle}>
              3. Take Selfie <Text style={styles.asterik}>*</Text>
            </Text>
            <Text style={styles.selfieDirection}>
              Your face needs to be clearly visible
            </Text>
            <View style={styles.selfieContainer}>
              {values.selfie ? (
                <Image
                  source={{uri: values.selfie}}
                  style={styles.imageStyle}
                />
              ) : (
                <TouchableOpacity
                  style={styles.cameraIconContainer}
                  activeOpacity={0.8}
                  onPress={() => takeSelfie(setFieldValue)}>
                  <CameraSvg
                    width={widthToRatio(20)}
                    height={heightToRatio(18)}
                  />
                  <Text style={styles.cameraTextStyle}>Open Camera</Text>
                </TouchableOpacity>
              )}
            </View>
            {values.selfie && (
              <TouchableOpacity
                style={styles.retakePictureContainer}
                activeOpacity={0.8}
                onPress={() => takeSelfie(setFieldValue)}>
                <CameraSvg
                  width={widthToRatio(20)}
                  height={heightToRatio(18)}
                />
                <Text style={styles.retakeTextStyle}>Retake Picture</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <Layout isScrollable>
      <ScreenHeader showScreenName={false} />
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({handleSubmit, setFieldValue, values}: FormikProps<FormValues>) => (
          <View style={CommonStyles.rowSpaceBetweenFlex}>
            <SubHeader
              otherSubHeaderContent={
                <ProfileSubHeader title={title}>
                  <View style={CommonStyles.flexColumn}>
                    <Text style={styles.welcomeText}>Welcome</Text>
                    <Text style={styles.titleText}>{title}</Text>
                  </View>
                </ProfileSubHeader>
              }>
              <View style={styles.headingContainer}>
                <CalendarSvg
                  width={heightToRatio(25)}
                  height={heightToRatio(25)}
                />
                <Text style={styles.salesTextStyle}>Sales Operations</Text>
              </View>
              <Text style={styles.headingTextStyle}>Today’s Attendance</Text>
              <Text style={styles.dateTextStyle}>{currentDate}</Text>
              <View style={styles.taskContainer}>
                {renderTask(values, setFieldValue)}
              </View>
            </SubHeader>
            <View>
              <CustomButton
                type={ButtonTypes.contained}
                style={styles.button}
                text={currentTask < 3 ? 'Proceed' : 'Submit'}
                isDisabled={checkDisabled(values)}
                onPress={currentTask < 3 ? handleProceed : handleSubmit}
              />
            </View>
          </View>
        )}
      </Formik>
    </Layout>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {paddingHorizontal: 4},
  headingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: heightToRatio(16),
  },
  headingTextStyle: {
    fontSize: heightToRatio(20),
    fontWeight: '700',
  },
  salesTextStyle: {
    color: COLORS.dDarkGreen,
    fontSize: heightToRatio(10),
    fontWeight: '400',
    lineHeight: heightToRatio(12.5),
    textAlignVertical: 'center',
    backgroundColor: COLORS.neutralLight,
    paddingHorizontal: widthToRatio(8),
    paddingVertical: heightToRatio(8),
  },
  dateTextStyle: {
    fontSize: heightToRatio(14),
    fontWeight: '500',
    lineHeight: heightToRatio(17.5),
    marginTop: heightToRatio(8),
  },
  taskContainer: {
    marginTop: heightToRatio(24),
  },
  taskTextStyle: {
    fontSize: heightToRatio(14),
    fontWeight: '500',
    lineHeight: heightToRatio(17.5),
  },
  asterik: {
    color: COLORS.red,
  },
  button: {
    marginHorizontal: widthToRatio(20),
    marginBottom: heightToRatio(12),
  },
  radioGroup: {
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'flex-start',
  },
  selfieDirection: {
    fontSize: heightToRatio(12),
    fontWeight: '400',
    lineHeight: heightToRatio(18),
    color: COLORS.greyText,
    left: widthToRatio(16),
    marginBottom: heightToRatio(8),
  },
  selfieContainer: {
    height: heightToRatio(107),
    width: widthToRatio(280),
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.greyText,
    borderRadius: heightToRatio(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraTextStyle: {
    color: COLORS.dgreen,
    fontSize: heightToRatio(12),
    fontWeight: '500',
    lineHeight: heightToRatio(15),
    marginTop: heightToRatio(6),
  },
  imageStyle: {
    width: widthToRatio(80),
    height: heightToRatio(80),
    borderRadius: heightToRatio(11),
  },
  retakePictureContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: heightToRatio(6),
  },
  retakeTextStyle: {
    color: COLORS.dgreen,
    fontSize: heightToRatio(12),
    fontWeight: '500',
    lineHeight: heightToRatio(15),
    marginLeft: heightToRatio(6),
  },
  vrButtonContainerStyle: {
    marginTop: heightToRatio(16),
  },
  labelStyle: {
    marginLeft: widthToRatio(6),
  },
  welcomeText: {
    fontWeight: '400',
    fontSize: heightToRatio(14),
    lineHeight: heightToRatio(21),
    color: COLORS.neutralLight,
  },
  titleText: {
    fontWeight: '500',
    fontSize: heightToRatio(16),
    lineHeight: heightToRatio(20),
    color: COLORS.neutralLight,
  },
});

// import React from 'react';
// import {FlatList, StyleSheet} from 'react-native';
// import {AttendanceOptions} from 'utils/Constants';
// import CheckinCheckoutArrowsIcon from '../../../../assets/icons/checkin-checkout-arrow.svg';
// import AttendanceRegularisationIcon from '../../../../assets/icons/attendance-regularisation.svg';
// import ApplyLeavesIcon from '../../../../assets/icons/apply-leaves.svg';
// import ActionButton from 'components/button/ActionButton';
// import Spacer from 'components/spacer';
// import Layout from 'components/Layout';
// import CommonStyles from 'utils/commonStyle';
// import {useNavigation} from '@react-navigation/native';

// const menuItems = [
//   {
//     name: AttendanceOptions.CHECK_IN_CHECK_OUT,
//     icon: <CheckinCheckoutArrowsIcon height={21} width={21} />,
//     navigationScreen: 'CheckInCheckOut',
//   },
//   {
//     name: AttendanceOptions.APPLY_REGULARISATION,
//     icon: <AttendanceRegularisationIcon height={21} width={21} />,
//     navigationScreen: 'AttendanceRegularisation',
//   },
//   {
//     name: AttendanceOptions.APPLY_LEAVES,
//     icon: <ApplyLeavesIcon height={21} width={21} />,
//     navigationScreen: 'AttendanceLeaves',
//   },
// ];

// export const AttendanceLandingScreen = () => {
//   const navigation = useNavigation();
//   return (
//     <Layout headerTitle={'Attendance'} style={CommonStyles.padding16}>
//       <FlatList
//         data={menuItems}
//         renderItem={({item}) => (
//           <ActionButton
//             icon={item.icon}
//             title={item.name}
//             key={item.name}
//             onPress={() => navigation.navigate(item.navigationScreen)}
//           />
//         )}
//         contentContainerStyle={styles.flatListContainer}
//         keyExtractor={(item, index) => `tile_${index}`}
//         showsVerticalScrollIndicator={false}
//       />
//     </Layout>
//   );
// };

// const styles = StyleSheet.create({
//   flatListContainer: {paddingHorizontal: 4},
// });
