import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from 'routes/RootNavigation';
import CommonStyles from 'utils/commonStyle';
import Layout from 'components/Layout';
import ActionButton from 'components/button/ActionButton';
import ExistingExpenseIcon from './../../../assets/icons/existingExpenseIcon.svg';
import NewExpenseIcon from './../../../assets/icons/newExpenseIcon.svg';

const ExpenseManagement = () => {
  const navigation = useNavigation<RootNavigationProp>();

  return (
    <Layout headerTitle="Expense Management" style={CommonStyles.padding}>
      <ActionButton
        title="New Expense"
        onPress={() => navigation.navigate('NewExpense')}
        icon={<NewExpenseIcon />}
      />
      <ActionButton
        title="Existing Expense"
        onPress={() => navigation.navigate('ExistingExpense')}
        icon={<ExistingExpenseIcon />}
      />
    </Layout>
  );
};

export default ExpenseManagement;
