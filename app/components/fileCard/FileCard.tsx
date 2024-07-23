import {StyleSheet, View} from 'react-native';
import React, {ReactNode} from 'react';
import {COLORS} from 'theme/colors';
import {Card, Text} from 'react-native-paper';

interface IFileCardProps {
  fileName: string;
  fileSize?: string;
  errorMsg?: string;
  leftIcon: ReactNode;
  rightIcon?: ReactNode;
  fileDate?: string;
}

const FileCard = ({
  fileName,
  fileSize,
  leftIcon,
  rightIcon,
  errorMsg,
  fileDate,
}: IFileCardProps) => {
  return (
    <Card style={styles.parentContainer}>
      <Card.Content style={styles.container}>
        {leftIcon}
        <View style={styles.textContainer}>
          <Text variant="bodyMedium">{fileName}</Text>
          <View style={styles.dateCard}>
            {fileSize ? <Text variant="bodySmall">{fileSize}</Text> : null}
            {fileDate && <View style={styles.dot} />}
            {fileDate ? <Text variant="bodySmall">{fileDate}</Text> : null}
          </View>
          {errorMsg ? (
            <Text variant="bodySmall" theme={{colors: {onSurface: COLORS.red}}}>
              {errorMsg}
            </Text>
          ) : null}
        </View>
        {rightIcon}
      </Card.Content>
    </Card>
  );
};

export default FileCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.lightGrey2,
    backgroundColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: 4,
  },
  textContainer: {
    flex: 1,
    paddingStart: 20,
  },
  parentContainer: {
    marginVertical: 10,
    elevation: 0,
    shadowRadius: 0,
  },
  dateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 50,
    backgroundColor: COLORS.grey2,
  },
});
