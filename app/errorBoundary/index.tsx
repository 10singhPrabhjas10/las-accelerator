import React from 'react';
import {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class ErrorBoundary extends Component<
  {children: React.ReactNode},
  {hasError: boolean}
> {
  constructor(props: any) {
    super(props);
    this.state = {hasError: false};
  }

  componentDidCatch(error: Error, info: any) {
    // Display fallback UI
    this.setState({hasError: true});
    // You can also log the error to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <View style={styles.errorViewContainer}>
          <Text>Something went wrong.</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

const styles = StyleSheet.create({
  errorViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
