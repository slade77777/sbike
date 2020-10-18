import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from 'shared-ui';
import {RouteProp, useRoute} from '@react-navigation/native';
import {MainStackParamList} from '../../RootNavigator';
import ContactForm from './ContactForm';

const ContactModal: React.FC = () => {
  const handleSend = () => {
    // TODO: call API
  };
  const {params} = useRoute<RouteProp<MainStackParamList, 'ContactModal'>>();
  return (
    <View style={styles.container}>
      <ContactForm
        type={params.type}
        financing={false} // TODO: use financing from route params
        agentId={null} // TODO: use agentId from route params
        selectedTourDate={null} // TODO: use selectedTourDate from route params
        onSend={handleSend}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.white400,
    flex: 1,
  },
});

export default ContactModal;
