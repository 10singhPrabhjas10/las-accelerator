import Accordion from 'components/accordion/Accordion';
import PrimaryTextInput from 'components/textInput/PrimaryTextInput';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Checkbox, Text} from 'react-native-paper';
import {COLORS} from 'theme/colors';
import {ID_ALL} from 'utils/Constants';

interface IFilterProps {
  id: string;
  name: string;
}

interface ICheckbox {
  data: IFilterProps[];
  filterData: string[];
  setFilterData: (data: string[]) => void;
  accordionTitle: string;
  isExpanded?: boolean;
  showSearch?: boolean;
}

const FilterCheckbox = ({
  data,
  filterData,
  setFilterData,
  accordionTitle,
  isExpanded,
  showSearch,
}: ICheckbox) => {
  const [searchQuery, setSearchQuery] = useState('');
  const handleCheckboxToggle = (id: string) => {
    if (id === ID_ALL) {
      if (filterData.includes(ID_ALL)) {
        setFilterData([]);
      } else {
        setFilterData(data.map(item => item.id));
      }
    } else {
      let updatedItems: string[];

      if (filterData.includes(id)) {
        updatedItems = filterData.filter(item => item !== id);
      } else {
        updatedItems = [...filterData, id];
      }
      setFilterData(updatedItems);
    }
  };

  const filteredData = data.filter(checkbox =>
    checkbox?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View>
      <Accordion
        headingStyle={styles.accordionHeadingStyle}
        titleStyle={styles.accordionTitleStyle}
        isExpanded={isExpanded}
        title={accordionTitle}>
        <View>
          {showSearch && (
            <PrimaryTextInput
              placeHolder="Search"
              value={searchQuery}
              containerStyle={styles.inputContainer}
              onChangeText={value => setSearchQuery(value)}
            />
          )}
          {filteredData.map((item, index) => {
            return (
              <View style={styles.container} key={index}>
                <Checkbox.Android
                  key={item.id}
                  status={
                    filterData.includes(item.id) ? 'checked' : 'unchecked'
                  }
                  onPress={() => handleCheckboxToggle(item.id)}
                />
                <Text variant="bodyMedium">{item?.name}</Text>
              </View>
            );
          })}
        </View>
      </Accordion>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    paddingLeft: 12,
  },
  accordionHeadingStyle: {
    backgroundColor: COLORS.white,
    shadowRadius: 0,
    elevation: 0,
  },
  accordionTitleStyle: {
    color: COLORS.darkOrange,
    fontFamily: 'soleto_medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 20,
    paddingLeft: 0,
  },
  inputContainer: {marginBottom: 10, marginHorizontal: 10},
});
export default FilterCheckbox;
