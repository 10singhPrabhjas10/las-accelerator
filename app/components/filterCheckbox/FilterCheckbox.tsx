import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Checkbox, Divider, Text} from 'react-native-paper';

import Accordion from 'components/accordion/Accordion';

import {ID_ALL} from 'utils/Constants';
import CommonStyles from 'utils/commonStyle';
import PrimaryTextInput from 'components/textInput/PrimaryTextInput';
import {getTranslationLabel} from 'utils/commonMethods';

interface CheckboxProps {
  id: string;
  name: string;
}

interface IFilterCheckboxProps {
  title: string;
  data: CheckboxProps[];
  showSearch?: boolean;
  handleCheckbox?: (item: CheckboxProps) => void;
  filterData: string[];
  setFilterData: (data: string[]) => void;
  accordianHeadingStyle?: object;
  accordianTitleStyle?: object;
}

const FilterCheckbox = ({
  title,
  data,
  handleCheckbox,
  showSearch = true,
  filterData,
  setFilterData,
  accordianHeadingStyle,
  accordianTitleStyle,
}: IFilterCheckboxProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAllSelected, setIsAllSelected] = useState(false);

  const handleCheckboxChange = (id: string) => {
    if (id === ID_ALL) {
      const updatedIsAllSelected = !isAllSelected;
      setIsAllSelected(updatedIsAllSelected);
      setFilterData(updatedIsAllSelected ? data.map(item => item.id) : []);
    } else {
      const updatedFilterData = [...filterData];
      const index = updatedFilterData.indexOf(id);

      if (index > -1) {
        updatedFilterData.splice(index, 1);
        const allIndex = updatedFilterData.indexOf(ID_ALL);
        if (allIndex > -1) {
          updatedFilterData.splice(allIndex, 1);
          setIsAllSelected(false);
        }
        setFilterData(updatedFilterData);
      } else {
        updatedFilterData.push(id);
        if (data.length - 1 === updatedFilterData.length) {
          updatedFilterData.push(ID_ALL);
          setIsAllSelected(true);
        }
        setFilterData(updatedFilterData);
      }
    }
  };

  const filteredData = data.filter(checkbox =>
    checkbox?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View>
      <Accordion
        headingStyle={{
          ...CommonStyles.accordionHeadingStyle,
          ...(accordianHeadingStyle || {}),
        }}
        titleStyle={{...CommonStyles.accordionTitleStyle, ...(accordianTitleStyle || {})}}
        isExpanded
        title={title}>
        <View>
          {showSearch && (
            <PrimaryTextInput
              placeHolder={getTranslationLabel('search')}
              value={searchQuery}
              containerStyle={styles.inputContainer}
              onChangeText={value => setSearchQuery(value)}
            />
          )}

          {filteredData.map((item, index) => {
            const isChecked = filterData.includes(item.id);

            return (
              <View style={styles.filterItemContainer} key={index}>
                <Checkbox.Android
                  status={isChecked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    handleCheckbox
                      ? handleCheckbox(item)
                      : handleCheckboxChange(item?.id);
                  }}
                />
                <Text variant="bodyMedium">{item.name}</Text>
              </View>
            );
          })}
        </View>
      </Accordion>
      <Divider style={CommonStyles.horizontalDivider2} />
    </View>
  );
};

export default FilterCheckbox;

const styles = StyleSheet.create({
  filterItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    paddingLeft: 5,
  },
  filterTitleText: {paddingVertical: 15},
  inputContainer: {marginBottom: 10, marginHorizontal: 10},
});
