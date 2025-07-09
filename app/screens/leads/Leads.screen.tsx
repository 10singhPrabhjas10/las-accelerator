import {useNavigation} from '@react-navigation/native';
import Layout from 'components/Layout';
import ActionButton from 'components/button/ActionButton';
import React, {useState} from 'react';
import {RootNavigationProp} from 'routes/RootNavigation';
import CommonStyles from 'utils/commonStyle';
import AddAccountIcon from './../../../assets/icons/addAccount.svg';
import {getTranslationLabel} from 'utils/commonMethods';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import {LasType} from 'screens/performanceManagement/PerformanceMgmt.interface';
import ActionTouchableButton from '@/components/button/ActionTouchableButton';
import MultipleFileIcon from '../../../assets/icons/multipleFile.svg';
import LeadOptionBottomSheet from './LeadOptionBottomSheet';

const Leads = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const lasType = useSelector((state: RootState) => state?.user?.user?.lasType);
  const [selectedCard, setSelectedCard] = useState('');
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const handleAddNewLead = () => {
    setBottomSheetVisible(false);
    navigation.navigate('NewAddLeadScreen');
    setSelectedCard('primary');
  };

  const handleViewLeads = () => {
    setBottomSheetVisible(false);
    navigation.navigate('ViewAddedLeadsScreen');
    setSelectedCard('secondary');
  };

  return (
    <Layout
      headerTitle={getTranslationLabel('leads')}
      style={CommonStyles.padding}>
      {lasType !== LasType.RE && (
        <ActionTouchableButton
          onPress={() => {
            setBottomSheetVisible(true);
            setSelectedCard('primary');
          }}
          title={getTranslationLabel('lead_addition')}
          leftIcon={<AddAccountIcon />}
        />
      )}

      <ActionTouchableButton
        onPress={() => navigation.navigate('LeadManagement')}
        title={getTranslationLabel('lead_management')}
        leftIcon={<MultipleFileIcon />}
      />

      <LeadOptionBottomSheet
        visible={bottomSheetVisible}
        onClose={() => setBottomSheetVisible(false)}
        onAddNewLead={handleAddNewLead}
        onViewLeads={handleViewLeads}
      />
    </Layout>
  );
};
export default Leads;
