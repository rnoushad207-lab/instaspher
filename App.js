import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';

const firebaseConfig = {
  apiKey: "AIzaSyC2JCtwaVpcJZChJdQP0NpFKJDc5ss9c0k",
  authDomain: "://firebaseapp.com",
  projectId: "force-chat-8c8ee",
  storageBucket: "force-chat-8c8ee.firebasestorage.app",
};

export default function App() {
  const [currentStep, setCurrentStep] = useState('welcome'); 
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [coins, setCoins] = useState(100); 
  const [isBlocked, setIsBlocked] = useState(true);

  const handleNextStep = (next) => {
    if (next === 'register_otp' && !phoneNumber) {
      Alert.alert('त्रुटि', 'कृपया मोबाइल नंबर दर्ज करें।');
      return;
    }
    setCurrentStep(next);
  };

  const handleVerifyOTP = () => {
    if (otpCode.length === 6) {
      setCurrentStep('home');
      Alert.alert('सफलता', 'InstaSphere में आपका स्वागत है!');
    } else {
      Alert.alert('त्रुटि', 'गलत OTP दर्ज किया गया है।');
    }
  };

  const handleSelfUnblock = () => {
    if (coins >= 50) {
      setCoins(coins - 50);
      setIsBlocked(false);
      Alert.alert('सफलता', '50 कॉइन्स कट गए। आप अनब्लॉक हो चुके हैं!');
    } else {
      Alert.alert('कॉइन कम हैं', 'वीडियो विज्ञापन देखें या कॉइन खरीदें!');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {currentStep === 'welcome' && (
        <View style={styles.card}>
          <Text style={styles.brandTitle}>InstaSphere</Text>
          <TouchableOpacity style={styles.instagramButton} onPress={() => handleNextStep('register_step1')}>
            <Text style={styles.buttonText}>नया अकाउंट बनाएं (Instagram Style)</Text>
          </TouchableOpacity>
        </View>
      )}

      {currentStep === 'register_step1' && (
        <View style={styles.card}>
          <Text style={styles.stepTitle}>मोबाइल नंबर दर्ज करें</Text>
          <TextInput 
            style={styles.input} 
            placeholder="मोबाइल नंबर" 
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <TouchableOpacity style={styles.instagramButton} onPress={() => handleNextStep('register_otp')}>
            <Text style={styles.buttonText}>OTP भेजें</Text>
          </TouchableOpacity>
        </View>
      )}

      {currentStep === 'register_otp' && (
        <View style={styles.card}>
          <Text style={styles.stepTitle}>6-अंकों का OTP डालें</Text>
          <TextInput 
            style={styles.input} 
            placeholder="6-Digit OTP" 
            keyboardType="number-pad"
            maxLength={6}
            value={otpCode}
            onChangeText={setOtpCode}
          />
          <TouchableOpacity style={styles.instagramButton} onPress={() => handleNextStep('register_step2')}>
            <Text style={styles.buttonText}>वेरिफाई करें</Text>
          </TouchableOpacity>
        </View>
      )}

      {currentStep === 'register_step2' && (
        <View style={styles.card}>
          <Text style={styles.stepTitle}>नाम और पासवर्ड</Text>
          <TextInput style={styles.input} placeholder="पूरा नाम" value={fullName} onChangeText={setFullName} />
          <TextInput style={styles.input} placeholder="पासवर्ड" secureTextEntry={true} value={password} onChangeText={setPassword} />
          <TouchableOpacity style={styles.instagramButton} onPress={handleVerifyOTP}>
            <Text style={styles.buttonText}>साइन अप पूरा करें</Text>
          </TouchableOpacity>
        </View>
      )}

      {currentStep === 'home' && (
        <View style={styles.homeContainer}>
          <Text style={styles.homeBrand}>InstaSphere</Text>
          <View style={styles.walletBox}>
            <Text style={styles.walletText}>💰 वॉलेट बैलेंस: {coins} कॉइन्स</Text>
            <TouchableOpacity style={styles.adButton} onPress={() => setCoins(coins + 20)}>
              <Text style={styles.buttonText}>📺 विज्ञापन देखें (+20 Coins)</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.featureBox}>
            <Text style={styles.featureTitle}>🚫 अनब्लॉक सिस्टम</Text>
            {isBlocked ? (
              <TouchableOpacity style={styles.unblockButton} onPress={handleSelfUnblock}>
                <Text style={styles.buttonText}>🔓 50 कॉइन खर्च करके खुद को अनब्लॉक करें</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.successText}>आप पूरी तरह अनब्लॉक हैं!</Text>
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#fafafa', justifyContent: 'center', alignItems: 'center', padding: 20 },
  card: { width: '100%', maxWidth: 400, backgroundColor: '#fff', borderRadius: 12, padding: 25, borderWidth: 1, borderColor: '#dbdbdb', alignItems: 'center' },
  brandTitle: { fontSize: 36, fontWeight: 'bold', color: '#000', marginBottom: 30 },
  stepTitle: { fontSize: 22, fontWeight: '600', color: '#262626', marginBottom: 15 },
  input: { width: '100%', height: 44, backgroundColor: '#fafafa', borderWidth: 1, borderColor: '#dbdbdb', borderRadius: 5, paddingHorizontal: 10, marginBottom: 15 },
  instagramButton: { width: '100%', height: 44, backgroundColor: '#0095f6', borderRadius: 5, justifyContent: 'center', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  homeContainer: { width: '100%', maxWidth: 500 },
  homeBrand: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  walletBox: { backgroundColor: '#fff', borderRadius: 10, padding: 20, borderWidth: 1, borderColor: '#dbdbdb', marginBottom: 20, alignItems: 'center' },
  walletText: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  adButton: { backgroundColor: '#34a853', borderRadius: 5, padding: 10 },
  featureBox: { backgroundColor: '#fff', borderRadius: 10, padding: 20, borderWidth: 1, borderColor: '#dbdbdb' },
  featureTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
  unblockButton: { backgroundColor: '#ea4335', borderRadius: 5, padding: 12, alignItems: 'center' },
  successText: { color: '#34a853', fontWeight: 'bold', textAlign: 'center', fontSize: 16 }
});
       
