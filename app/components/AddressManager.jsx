import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
  Modal
} from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddressManager({ onSelectAddress, selectedAddressId }) {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    address_type: 'Home'
  });

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    if (onSelectAddress) {
      onSelectAddress(address);
    }
  };

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('userToken');
      
      if (!token) {
        setError('Please login to view addresses');
        return;
      }

      const response = await fetch(
        'https://ecommerce-shop-qg3y.onrender.com/api/address/displayAllAdress',
        {
          headers: {
            'Authorization': token
          }
        }
      );

      const result = await response.json();
      
      if (result.success) {
        setAddresses(result.data || []);
      } else {
        setError(result.message || 'Failed to fetch addresses');
      }
    } catch (error) {
      console.error('API Error:', error);
      setError('Failed to fetch addresses');
    } finally {
      setLoading(false);
    }
  };

  const handleAddAddress = async () => {
    try {
      // Validate form data
      const requiredFields = {
        fullName: formData.fullName?.trim(),
        phoneNumber: formData.phoneNumber?.toString(),
        pincode: formData.pincode?.trim(),
        state: formData.state?.trim(),
        city: formData.city?.trim(),
        addressLine1: formData.addressLine1?.trim()
      };

      const emptyFields = Object.entries(requiredFields)
        .filter(([_, value]) => !value)
        .map(([key]) => key);

      if (emptyFields.length > 0) {
        Alert.alert('Error', `Please fill in the following fields: ${emptyFields.join(', ')}`);
        return;
      }

      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Error', 'Please login to add address');
        return;
      }

      // Prepare the request data with exact field names the API expects
      const requestData = {
        fullName: formData.fullName.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        addressLine1: formData.addressLine1.trim(),
        addressLine2: formData.addressLine2?.trim() || '',
        landmark: formData.landmark?.trim() || '',
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim(),
        address_type: formData.address_type || 'Home',
        country: 'India'
      };

      console.log('Request Data:', requestData);

      const response = await fetch(
        'https://ecommerce-shop-qg3y.onrender.com/api/address/addAddress',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify(requestData)
        }
      );

      const result = await response.json();
      console.log('Add address response:', result);

      if (result.success) {
        Alert.alert('Success', 'Address added successfully');
        setShowAddModal(false);
        clearForm();
        fetchAddresses();
      } else {
        Alert.alert('Error', result.message || 'Failed to add address');
      }
    } catch (error) {
      console.error('API Error:', error);
      Alert.alert('Error', 'Failed to add address. Please try again.');
    }
  };

  const handleUpdateAddress = async () => {
    try {
      if (!editingAddress?._id) return;

      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Error', 'Please login to update address');
        return;
      }

      // Prepare the request data with exact field names
      const requestData = {
        fullName: formData.fullName.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        addressLine1: formData.addressLine1.trim(),
        addressLine2: formData.addressLine2?.trim() || '',
        landmark: formData.landmark?.trim() || '',
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim(),
        type: formData.address_type || 'Home',
        country: 'India'
      };

      console.log('Update Request Data:', requestData);

      const response = await fetch(
        `https://ecommerce-shop-qg3y.onrender.com/api/address/updateAddress?addressId=${editingAddress._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify(requestData)
        }
      );

      const result = await response.json();
      console.log('Update address response:', result);

      if (result.success) {
        Alert.alert('Success', 'Address updated successfully');
        setShowAddModal(false);
        setEditingAddress(null);
        clearForm();
        fetchAddresses();
      } else {
        Alert.alert('Error', result.message || 'Failed to update address');
      }
    } catch (error) {
      console.error('API Error:', error);
      Alert.alert('Error', 'Failed to update address');
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Error', 'Please login to delete address');
        return;
      }

      const response = await fetch(
        `https://ecommerce-shop-qg3y.onrender.com/api/address/deleteAddress?addressId=${addressId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': token
          }
        }
      );

      const result = await response.json();

      if (result.success) {
        Alert.alert('Success', 'Address deleted successfully');
        fetchAddresses();
      } else {
        Alert.alert('Error', result.message || 'Failed to delete address');
      }
    } catch (error) {
      console.error('API Error:', error);
      Alert.alert('Error', 'Failed to delete address');
    }
  };

  const setDefaultAddress = async (addressId) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Error', 'Please login to set default address');
        return;
      }

      const response = await fetch(
        `https://ecommerce-shop-qg3y.onrender.com/api/address/selectDefaultAddress?addressId=${addressId}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': token
          }
        }
      );

      const result = await response.json();

      if (result.success) {
        Alert.alert('Success', 'Default address updated');
        const updatedAddress = addresses.find(addr => addr._id === addressId);
        if (updatedAddress) {
          setSelectedAddress(updatedAddress);
          if (onSelectAddress) {
            onSelectAddress(updatedAddress);
          }
        }
        fetchAddresses();
      } else {
        Alert.alert('Error', result.message || 'Failed to set default address');
      }
    } catch (error) {
      console.error('API Error:', error);
      Alert.alert('Error', 'Failed to set default address');
    }
  };

  const clearForm = () => {
    setFormData({
      fullName: '',
      phoneNumber: '',
      addressLine1: '',
      addressLine2: '',
      landmark: '',
      city: '',
      state: '',
      pincode: '',
      address_type: 'Home',
      country: 'India'
    });
  };

  const editAddress = (address) => {
    setEditingAddress(address);
    setFormData({
      fullName: address.fullName || '',
      phoneNumber: address.phoneNumber?.toString() || '',
      addressLine1: address.addressLine1 || '',
      addressLine2: address.addressLine2 || '',
      landmark: address.landmark || '',
      city: address.city || '',
      state: address.state || '',
      pincode: address.pincode || '',
      address_type: address.type || 'Home',
      country: address.country || 'India'
    });
    setShowAddModal(true);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F83758" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => {
          clearForm();
          setEditingAddress(null);
          setShowAddModal(true);
        }}
      >
        <AntDesign name="plus" size={20} color="#FFFFFF" />
        <Text style={styles.addButtonText}>Add New Address</Text>
      </TouchableOpacity>

      <ScrollView style={styles.addressList}>
        {addresses.map((address) => (
          <TouchableOpacity 
            key={address._id} 
            style={[
              styles.addressCard,
              selectedAddress?._id === address._id && styles.selectedAddressCard
            ]}
            onPress={() => handleSelectAddress(address)}
          >
            <View style={styles.addressHeader}>
              <View style={styles.selectionContainer}>
                <View style={[
                  styles.radioButton,
                  selectedAddress?._id === address._id && styles.radioButtonSelected
                ]}>
                  {selectedAddress?._id === address._id && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
                <View style={styles.addressType}>
                  <Text style={styles.addressTypeText}>{address.type}</Text>
                  {address.isDefault && (
                    <View style={styles.defaultBadge}>
                      <Text style={styles.defaultText}>Default</Text>
                    </View>
                    
                  )}
                  {!address.isDefault && (
              <TouchableOpacity 
                style={styles.setDefaultButton}
                onPress={(e) => {
                  e.stopPropagation();
                  setDefaultAddress(address._id);
                }}
              >
                <Text style={styles.setDefaultText}>Set as Default</Text>
              </TouchableOpacity>
            )}
                </View>
              </View>
              <View style={styles.actionButtons}>
                <TouchableOpacity 
                  style={styles.editButton}
                  onPress={(e) => {
                    e.stopPropagation();
                    editAddress(address);
                  }}
                >
                  <Feather name="edit" size={18} color="#666" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={(e) => {
                    e.stopPropagation();
                    Alert.alert(
                      'Delete Address',
                      'Are you sure you want to delete this address?',
                      [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Delete', onPress: () => handleDeleteAddress(address._id) }
                      ]
                    );
                  }}
                >
                  <AntDesign name="delete" size={18} color="#F83758" />
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.name}>{address.fullName}</Text>
            <Text style={styles.mobile}>{address.phoneNumber}</Text>
            <Text style={styles.addressText}>
              {address.addressLine1}
              {address.addressLine2 ? `, ${address.addressLine2}` : ''}
              {address.landmark ? `, ${address.landmark}` : ''}
              {`\n${address.city}, ${address.state} - ${address.pincode}`}
            </Text>

            
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingAddress ? 'Edit Address' : 'Add New Address'}
              </Text>
              <TouchableOpacity 
                onPress={() => {
                  setShowAddModal(false);
                  setEditingAddress(null);
                  clearForm();
                }}
              >
                <AntDesign name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.formContainer}>
              <TextInput
                style={styles.input}
                placeholder="Full Name *"
                value={formData.fullName}
                onChangeText={(text) => setFormData({...formData, fullName: text})}
              />
              <TextInput
                style={styles.input}
                placeholder="Mobile Number *"
                value={formData.phoneNumber}
                onChangeText={(text) => setFormData({...formData, phoneNumber: text})}
                keyboardType="phone-pad"
                maxLength={10}
              />
              <TextInput
                style={styles.input}
                placeholder="Pincode *"
                value={formData.pincode}
                onChangeText={(text) => setFormData({...formData, pincode: text})}
                keyboardType="number-pad"
                maxLength={6}
              />
              <TextInput
                style={styles.input}
                placeholder="State *"
                value={formData.state}
                onChangeText={(text) => setFormData({...formData, state: text})}
              />
              <TextInput
                style={styles.input}
                placeholder="City *"
                value={formData.city}
                onChangeText={(text) => setFormData({...formData, city: text})}
              />
              <TextInput
                style={styles.input}
                placeholder="House Number/ Society Name *"
                value={formData.addressLine1}
                onChangeText={(text) => setFormData({...formData, addressLine1: text})}
                multiline
              />
              <TextInput
                style={styles.input}
                placeholder="Street name / Area Name"
                value={formData.addressLine2}
                onChangeText={(text) => setFormData({...formData, addressLine2: text})}
                multiline
              />
              <TextInput
                style={styles.input}
                placeholder="Landmark (Optional)"
                value={formData.landmark}
                onChangeText={(text) => setFormData({...formData, landmark: text})}
              />

              <View style={styles.addressTypeContainer}>
                {['Home', 'Work', 'Other'].map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.addressTypeButton,
                      formData.address_type === type && styles.selectedAddressType
                    ]}
                    onPress={() => setFormData({...formData, address_type: type})}
                  >
                    <Text style={[
                      styles.addressTypeButtonText,
                      formData.address_type === type && styles.selectedAddressTypeText
                    ]}>
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={styles.submitButton}
                onPress={editingAddress ? handleUpdateAddress : handleAddAddress}
              >
                <Text style={styles.submitButtonText}>
                  {editingAddress ? 'Update Address' : 'Add Address'}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F83758',
    padding: 12,
    borderRadius: 8,
    margin: 16,
    gap: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  addressList: {
    flex: 1,
    padding: 16,
  },
  addressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:2,
  },
  radioButton: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#F83758',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: '#F83758',
  },
  radioButtonInner: {
    width: 8,
    height: 8,
    borderRadius: 6,
    backgroundColor: '#F83758',
  },
  addressType: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addressTypeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  defaultBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  defaultText: {
    fontSize: 12,
    color: '#00A36C',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  editButton: {
    padding: 4,
  },
  deleteButton: {
    padding: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  mobile: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  setDefaultButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: '#FFF0F3',
  },
  setDefaultText: {
    fontSize: 14,
    color: '#F83758',
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  formContainer: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 14,
  },
  addressTypeContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  addressTypeButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    alignItems: 'center',
  },
  selectedAddressType: {
    backgroundColor: '#F83758',
    borderColor: '#F83758',
  },
  addressTypeButtonText: {
    fontSize: 14,
    color: '#666',
  },
  selectedAddressTypeText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#F83758',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  selectedAddressCard: {
    borderColor: '#F83758',
    borderWidth: 1,
  },
});