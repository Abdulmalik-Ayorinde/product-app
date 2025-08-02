import React, { JSX, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ListRenderItem,
} from 'react-native';
import { router } from 'expo-router';
import { useProducts } from '../context/ProductContext';
import { Product } from '../types/Product';
import ProductCard from '../components/ProductCard';
import NotificationModal from '../components/NotificationModal';

export default function HomeScreen() {
  const { products, canAddProduct, getRemainingSlots } = useProducts();
  const [showLimitModal, setShowLimitModal] = useState<boolean>(false);

  const handleAddProduct = (): void => {
    if (canAddProduct()) {
      router.push('/add-product');
    } else {
      setShowLimitModal(true);
    }
  };

  const renderEmptyState = (): JSX.Element => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateTitle}>No Products Yet</Text>
      <Text style={styles.emptyStateText}>
        Add your first product to get started!
      </Text>
    </View>
  );

  const renderProduct: ListRenderItem<Product> = ({ item }) => (
    <ProductCard product={item} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Products ({products.length}/{5})
        </Text>
        <Text style={styles.headerSubtitle}>
          {getRemainingSlots()} slots remaining
        </Text>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={[
          styles.addButton,
          !canAddProduct() && styles.addButtonDisabled,
        ]}
        onPress={handleAddProduct}
        disabled={!canAddProduct()}
      >
        <Text style={styles.addButtonText}>
          {canAddProduct() ? '+ Add Product' : 'Limit Reached'}
        </Text>
      </TouchableOpacity>

      <NotificationModal
        visible={showLimitModal}
        onClose={() => setShowLimitModal(false)}
        title="Product Limit Reached"
        message="You have reached the maximum limit of 5 products. Please delete a product to add a new one."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  listContainer: {
    padding: 16,
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#64748b',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#6366f1',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#6366f1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  addButtonDisabled: {
    backgroundColor: '#94a3b8',
    shadowOpacity: 0,
    elevation: 0,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});