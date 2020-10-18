import React, {FC} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';
import {Formik} from 'formik';
import {StoreState, ContactFormType} from 'shared-logic';
import {Button, L3, L4} from 'components-library';
import {Switch, TextInput} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import ErrorMessage from './ErrorMessage';

export enum ContactType {
  // Primary
  PRIMARY_HOME_TOUR = 'PRIMARY_HOME_TOUR',
  PRIMARY_ASK_QUESTION = 'PRIMARY_ASK_QUESTION',
  PRIMARY_REQUEST_QUOTATION = 'PRIMARY_REQUEST_QUOTATION',
  PRIMARY_AGENT_CONSULTING = 'PRIMARY_AGENT_CONSULTING',
  PRIMARY_REGISTER_EVENT = 'PRIMARY_REGISTER_EVENT',
  // Secondary
  SECONDARY_HOME_TOUR = 'SECONDARY_HOME_TOUR',
  SECONDARY_ASK_QUESTION = 'SECONDARY_ASK_QUESTION',
  SECONDARY_AGENT_CONSULTING = 'SECONDARY_AGENT_CONSULTING',
  // General
  APARTMENT_SELLING = 'APARTMENT_SELLING',
  FINANCE_CONSULTING = 'FINANCE_CONSULTING',
  ASK_QUESTION = 'ASK_QUESTION',
}

export type ContactFormModel = {
  type: ContactType;
  name: string;
  phone: string;
  email: string;
  note: string;
  financing: boolean;
  agentId: string;
  date: string;
};

const buttonTitle: {[key: string]: string} = {
  [ContactType.PRIMARY_ASK_QUESTION]:
    'screens.projectDetails.contact.sendMessage',
  [ContactType.SECONDARY_ASK_QUESTION]:
    'screens.projectDetails.contact.sendMessage',
  [ContactType.ASK_QUESTION]: 'screens.projectDetails.contact.sendMessage',
  [ContactType.PRIMARY_HOME_TOUR]: 'screens.projectDetails.contact.schedule',
  [ContactType.SECONDARY_HOME_TOUR]: 'screens.projectDetails.contact.schedule',
};

const title: {[key: string]: string} = {
  [ContactType.PRIMARY_ASK_QUESTION]: 'screens.projectDetails.askQuestion',
  [ContactType.SECONDARY_ASK_QUESTION]: 'screens.projectDetails.askQuestion',
  [ContactType.ASK_QUESTION]: 'screens.projectDetails.askQuestion',
  [ContactType.PRIMARY_HOME_TOUR]: 'screens.projectDetails.scheduleHomeTour',
  [ContactType.SECONDARY_HOME_TOUR]: 'screens.projectDetails.scheduleHomeTour',
};

type Props = {
  type: ContactType;
  financing?: boolean;
  selectedTourDate?: string | null;
  agentId?: string | null;
  onSend?: (form: ContactFormModel) => void;
};

const ContactForm: FC<Props> = ({
  type,
  financing,
  agentId,
  selectedTourDate,
}) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {userInformation} = useSelector<
    StoreState,
    {
      userInformation: ContactFormType;
    }
  >((state) => ({
    userInformation: state.postContactForm?.userInformation,
  }));

  React.useEffect(() => {
    navigation.setOptions({
      title: t(title[type] || 'screens.projectDetails.leaveInformation'),
    });
  }, [type]);

  return (
    <Formik
      initialValues={{
        name: userInformation?.customer?.name,
        phoneNumber: userInformation?.customer?.phone,
        email: userInformation?.customer?.email,
        note: '', // TODO: use properly computed default note value
        financing: financing || false,
        agentId: agentId,
        date: selectedTourDate || userInformation?.scheduled_date,
      }}
      enableReinitialize
      validate={(values) => {
        // TODO: validators should be moved to some shared place (shared-logic)
        // We can use here logic similar we have in transaction-mobile-next.
        // See `next/utils/validation.tsx` and `transaction-web-next/hooks/useEventModalValidationFields.tsx` files

        const errors: any = {};

        if (!values.name) {
          errors.name = t('screens.projectDetails.error.nameEmpty');
        } else if (!/^\D*$/.test(values.name)) {
          errors.name = t('screens.projectDetails.error.nameInvalid');
        } else if (!/^.{1,50}$/.test(values.name)) {
          errors.name = t('screens.projectDetails.error.nameInvalid');
        }

        if (!values.phoneNumber) {
          errors.phoneNumber = t(
            'screens.projectDetails.error.phoneNumberEmpty',
          );
        } else if (!/^[+\d]\d*$/.test(values.phoneNumber)) {
          errors.phoneNumber = t(
            'screens.projectDetails.error.phoneNumberInvalid',
          );
        } else if (!/^.{9,12}$/.test(values.phoneNumber)) {
          errors.phoneNumber = t(
            'screens.projectDetails.error.phoneNumberInvalid',
          );
        }

        if (!values.email) {
          errors.email = t('screens.projectDetails.error.emailEmpty');
        } else if (!/^[\w-]*\.?[\w-]*@\w*\.\w*$/.test(values.email)) {
          errors.email = t('screens.projectDetails.error.emailInvalid');
        }

        return errors;
      }}
      onSubmit={() => {}}>
      {({
        errors,
        touched,
        setFieldValue,
        handleSubmit,
        handleChange,
        handleBlur,
        values,
      }) => (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <TextInput
              label={t('screens.projectDetails.contact.name')}
              accessibilityStates={[]}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              placeholder={t('screens.projectDetails.placeholder.name')}
              error={!!(touched.name && errors.name)}
              mode="outlined"
              style={styles.input}
            />
            <ErrorMessage>
              {touched.name ? errors.name : undefined}
            </ErrorMessage>
            <TextInput
              label={t('screens.projectDetails.contact.phoneNumber')}
              accessibilityStates={[]}
              onChangeText={handleChange('phoneNumber')}
              onBlur={handleBlur('phoneNumber')}
              value={values.phoneNumber}
              placeholder={t('screens.projectDetails.placeholder.phoneNumber')}
              error={!!(touched.phoneNumber && errors.phoneNumber)}
              mode="outlined"
              style={styles.input}
            />
            <ErrorMessage>
              {touched.phoneNumber ? errors.phoneNumber : undefined}
            </ErrorMessage>
            <TextInput
              label={t('screens.projectDetails.contact.email')}
              accessibilityStates={[]}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder={t('screens.projectDetails.placeholder.email')}
              error={!!(touched.email && errors.email)}
              mode="outlined"
              style={styles.input}
            />
            <ErrorMessage>
              {touched.email ? errors.email : undefined}
            </ErrorMessage>
            <TextInput
              label={t('screens.projectDetails.contact.note')}
              accessibilityStates={[]}
              onChangeText={handleChange('note')}
              onBlur={handleBlur('note')}
              value={values.note}
              placeholder={t('screens.projectDetails.placeholder.note')}
              error={!!(touched.note && errors.note)}
              mode="outlined"
              multiline
              numberOfLines={3}
              style={styles.input}
            />
            <ErrorMessage>
              {touched.note ? errors.note : undefined}
            </ErrorMessage>
            <View style={styles.financingField}>
              <Switch
                value={values.financing}
                onValueChange={(value) => setFieldValue('financing', value)}
                accessibilityStates={[]}
              />
              <L3 style={styles.financingLabel}>
                {t('screens.projectDetails.contact.financingInfo')}
              </L3>
            </View>
          </ScrollView>
          <View>
            <Button
              onPress={handleSubmit}
              title={t(
                buttonTitle[type] || 'screens.projectDetails.contact.send',
              )}
              style={styles.button}
              type="contained"
            />
            <L4 style={styles.bottomTitle}>
              {t('screens.projectDetails.contact.infoProtected')}
            </L4>
          </View>
        </SafeAreaView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  input: {
    marginTop: 5,
  },
  button: {
    marginVertical: 8,
  },
  bottomTitle: {
    fontSize: 13,
    lineHeight: 16,
    marginBottom: 6,
  },
  financingField: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  financingLabel: {
    marginLeft: 10,
  },
});

export default ContactForm;
