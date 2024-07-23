import {StyleSheet, View} from 'react-native';
import React, {SetStateAction, useEffect, useState} from 'react';
import {Checkbox, Divider, Text} from 'react-native-paper';
import {ID_ALL} from 'utils/Constants';
import Accordion from 'components/accordion/Accordion';
import {COLORS} from 'theme/colors';
import PrimaryTextInput from 'components/textInput/PrimaryTextInput';

interface CheckboxProps {
  id: string;
  name: string;
  isChecked: boolean;
}

interface IFilterCheckboxProps {
  title: string;
  data: CheckboxProps[];
  setData: SetStateAction<any>;
  showSearch?: boolean;
  isUncheckCheckbox?: boolean;
  handleCheckbox?: (item: ILeadTypeCheckboxProps) => void;
}

const FilterCheckbox = ({
  title,
  data,
  setData,
  handleCheckbox,
  showSearch = true,
  isUncheckCheckbox = false,
}: IFilterCheckboxProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleCheckboxChange = (id: string) => {
    setData((prevCheckboxes: ILeadTypeCheckboxProps[]) => {
      if (id === ID_ALL) {
        let checked = prevCheckboxes[0].isChecked;
        return prevCheckboxes?.map(checkbox => ({
          ...checkbox,
          isChecked: !checked,
        }));
      }

      return prevCheckboxes?.map(checkbox => {
        return checkbox.id === id
          ? {...checkbox, isChecked: !checkbox.isChecked}
          : checkbox;
      });
    });
  };

  useEffect(() => {
    if (isUncheckCheckbox) {
      setData((prevCheckboxes: ILeadTypeCheckboxProps[]) => {
        return prevCheckboxes?.map(checkbox => {
          return {...checkbox, isChecked: false};
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUncheckCheckbox]);

  const filteredData = data.filter(checkbox =>
    checkbox?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View>
      <Accordion
        headingStyle={styles.accordionHeadingStyle}
        titleStyle={styles.accordionTitleStyle}
        title={title}>
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
              <View style={styles.filterItemContainer} key={index}>
                <Checkbox.Android
                  status={item.isChecked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    handleCheckbox
                      ? handleCheckbox(item)
                      : handleCheckboxChange(item?.id);
                  }}
                />
                <Text variant="bodySmall">{item.name}</Text>
              </View>
            );
          })}
        </View>
      </Accordion>
      <Divider style={styles.divider} />
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
  divider: {backgroundColor: COLORS.grey, marginBottom: 10},
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
