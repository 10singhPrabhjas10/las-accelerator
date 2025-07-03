import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from 'routes/RootNavigation';
import CommonStyles from 'utils/commonStyle';
import Layout from 'components/Layout';
import ActionButton from 'components/button/ActionButton';
import ExistingExpenseIcon from './../../../assets/icons/existingExpenseIcon.svg';
import NewExpenseIcon from './../../../assets/icons/newExpenseIcon.svg';
import {COLORS} from '@/theme/colors';
import CustomButton from '@/components/button/CustomButton';
import ActionTouchableButton from '@/components/button/ActionTouchableButton';

const ExpenseManagement = () => {
  const navigation = useNavigation<RootNavigationProp>();

  return (
    <Layout headerTitle="Expense Management" style={CommonStyles.padding}>
      <ActionTouchableButton
        title={'New Expense'}
        onPress={() => navigation.navigate('NewExpense')}
        leftIcon={<NewExpenseIcon />}
      />
      <ActionTouchableButton
        title="Existing Expense"
        onPress={() => navigation.navigate('ExistingExpense')}
        leftIcon={<ExistingExpenseIcon />}
      />
    </Layout>
  );
};

export default ExpenseManagement;
