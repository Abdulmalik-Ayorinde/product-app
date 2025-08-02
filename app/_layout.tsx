import { Stack } from 'expo-router';
import { ProductProvider } from '../context/ProductContext';

export default function RootLayout() {
  return (
    <ProductProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6366f1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{ title: 'My Products' }}
        />
        <Stack.Screen
          name="add-product"
          options={{ title: 'Add Product' }}
        />
      </Stack>
    </ProductProvider>
  );
}