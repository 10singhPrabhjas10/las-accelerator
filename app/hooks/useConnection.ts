import React from 'react';
import NetInfo, {
  NetInfoState,
  NetInfoSubscription,
} from '@react-native-community/netinfo';

export default function useConnection() {
  const [isConnected, setIsConnected] = React.useState<boolean>(true);
  const [slowInternet, setSlowInternet] = React.useState<boolean>(false);

  React.useEffect(() => {
    let netInfoSubscription: NetInfoSubscription | null = null;
    const manageConnection = () => {
      retryConnection();
      netInfoSubscription = NetInfo.addEventListener(handleConnectivityChange);
    };
    // Check network connection
    // const retryConnection = async () => {
    //   handleConnectivityChange(await NetInfo.fetch());
    // };
    manageConnection();
    return () => {
      if (netInfoSubscription) {
        netInfoSubscription();
      }
    };
  }, []);

  async function retryConnection() {
    handleConnectivityChange(await NetInfo.fetch());
  }

  // Managed internet connection
  const handleConnectivityChange = (info: NetInfoState) => {
    // let info = {type: 'cellular', isConnected:true, isInternetReachable:true, details:{cellularGeneration:null}}
    if (!info.isConnected || !info.isInternetReachable) {
      setIsConnected(false);
    } else {
      if (
        info.type === 'cellular' &&
        info.details.cellularGeneration === '2g'
      ) {
        // showSlowInternError
        setSlowInternet(true);
      } else {
        setSlowInternet(false);
      }
      setIsConnected(true);
    }
  };

  return {isConnected, slowInternet, retryConnection};
}
