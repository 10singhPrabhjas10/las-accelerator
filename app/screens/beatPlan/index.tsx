import CustomButton from '@/components/button/CustomButton';
import ScreenHeader from '@/components/headers/ScreenHeader';
import Layout from '@/components/Layout';
import {Text} from 'react-native-paper';
import {ButtonTypes} from '@/types/buttons';
import {getTranslationLabel} from '@/utils/commonMethods';
import React, {useState, useEffect, useRef} from 'react';
import {styles} from './styles';
import BackgroundHeader from '@/components/headers/BackgroundHeader';
import SearchInput from '@/components/searchInput';
import {TouchableOpacity, View} from 'react-native';
import CommonStyles from '@/utils/commonStyle';
import MapIconWhite from '../../../assets/icons/map_white.svg';
import ListIconWhite from '../../../assets/icons/list_white.svg';
import MapIconDark from '../../../assets/icons/map_dark.svg';
import ListIconDark from '../../../assets/icons/list_dark.svg';
import {COLORS} from '@/theme/colors';
import BeatList from './BeatList';
import BeatMap from './BeatMap';
import BottomSheetModalComponent from '@/bottomSheets/bottomSheetModal/BottomSheetModalComponent';
import CustomRadioButton from '@/components/radioButton/CustomRadioButton';
import {fontConfig} from '@/theme/fonts';
import OptimiseRoute from './optimiseRoute';
import {useNavigation} from '@react-navigation/native';
import {getCurrentLocation} from '@/utils/Permissions';
interface ISelector {
  Switch: boolean;
  setSwitch: Function;
}
function Selector({Switch = true, setSwitch = () => {}}: ISelector) {
  return (
    <View style={styles.Selector}>
      <TouchableOpacity
        onPress={() => setSwitch(true)}
        style={[styles.box, Switch && styles.whiteBackground]}>
        {!Switch ? <ListIconWhite /> : <ListIconDark />}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setSwitch(false)}
        style={[styles.box, !Switch && styles.whiteBackground]}>
        {Switch ? <MapIconWhite /> : <MapIconDark />}
      </TouchableOpacity>
    </View>
  );
}

function BeatPlan() {
  const [search, setSearch] = useState<string>('');
  const [Switch, setSwitch] = useState<boolean>(true);
  const ref = React.useRef(null);
  const navigation = useNavigation();
  const PresentModal = () => {
    ref.current?.present();
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <Layout style={styles.layout}>
      <ScreenHeader
        onBackPress={navigation.goBack}
        header={getTranslationLabel('today_beat_plan')}
      />
      <BackgroundHeader>
        <View style={CommonStyles.flexRow}>
          <SearchInput
            value={search}
            onChangeText={text => setSearch(text)}
            placeholder={getTranslationLabel('Search')}
            customStyles={[CommonStyles.flexOne, styles.marginRightZero]}
          />
          <Selector Switch={Switch} setSwitch={setSwitch} />
        </View>
      </BackgroundHeader>
      {Switch ? <BeatList /> : <BeatMap />}
      <CustomButton
        text={getTranslationLabel('Optimise_Route')}
        onPress={PresentModal}
        style={styles.Button}
        type={ButtonTypes.contained}
      />
      <OptimiseRoute ref={ref} />
    </Layout>
  );
}
export default BeatPlan;
