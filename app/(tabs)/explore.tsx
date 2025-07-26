import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SquircleView } from 'react-native-figma-squircle';

const { width: screenWidth } = Dimensions.get('window');

// Sample product data
const productsData = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tag: 'Size Guide',
    title: 'Knitted Ski Neck Sweater',
    description: 'Premium wool blend sweater perfect for winter sports and casual wear.',
    price: '$89.99',
    currency: 'USD'
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tag: 'New Arrival',
    title: 'Casual Cotton T-Shirt',
    description: 'Comfortable everyday wear with modern fit and breathable fabric.',
    price: '$24.99',
    currency: 'USD'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tag: 'Best Seller',
    title: 'Denim Jacket Classic',
    description: 'Timeless denim jacket with vintage wash and premium construction.',
    price: '$129.99',
    currency: 'USD'
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tag: 'Limited',
    title: 'Athletic Track Pants',
    description: 'Performance wear for active lifestyle with moisture-wicking technology.',
    price: '$69.99',
    currency: 'USD'
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tag: 'Sale',
    title: 'Business Formal Shirt',
    description: 'Professional attire with wrinkle-resistant fabric and tailored fit.',
    price: '$59.99',
    currency: 'USD'
  }
];

const ProductCard = ({ item, onPress }) => {
  const getTagColor = (tag) => {
    switch (tag) {
      case 'New Arrival': return '#FF6B6B';
      case 'Best Seller': return '#4ECDC4';
      case 'Limited': return '#FFD93D';
      case 'Sale': return '#FF8C42';
      default: return '#38C240';
    }
  };

  return (
    <SquircleView
      style={[styles.productCard, {
        shadowColor: '#484848',
        shadowOffset: { width: 0, height: 60 },
        shadowOpacity: 0.16,
        shadowRadius: 100,
        elevation: 24,
      }]}
      squircleParams={{
        cornerRadius: 42,
        cornerSmoothing: 0.6
      }}
    >
      {/* Product Image Container */}
      <SquircleView
        style={styles.productImageContainer}
        squircleParams={{
          cornerRadius: 32,
          cornerSmoothing: 0.6
        }}
      >
        {/* Product Image */}
        <Image 
          source={{ uri: item.image }}
          style={styles.productImage}
          resizeMode="cover"
        />
        
        {/* Tag */}
        <SquircleView
          style={[styles.tag, { backgroundColor: getTagColor(item.tag) }]}
          squircleParams={{
            cornerRadius: 100,
            cornerSmoothing: 0.6
          }}
        >
          <Text style={styles.tagText}>{item.tag}</Text>
        </SquircleView>
      </SquircleView>
      
      {/* Product Information */}
      <View style={styles.productInfo}>
        {/* Product Title */}
        <Text style={styles.productTitle}>{item.title}</Text>
        
        {/* Product Description */}
        <Text style={styles.productDescription}>{item.description}</Text>
        
        {/* Price and Button Row */}
        <View style={styles.priceButtonRow}>
          {/* Price */}
          <View style={styles.priceContainer}>
            <Text style={styles.currencyText}>{item.currency}</Text>
            <Text style={styles.priceText}>{item.price}</Text>
          </View>
          
          {/* Purchase Button */}
          <TouchableOpacity
            onPress={() => onPress(item)}
            activeOpacity={0.8}
          >
            <SquircleView
              style={styles.purchaseButton}
              squircleParams={{
                cornerRadius: 80,
                cornerSmoothing: 0.6
              }}
            >
              <Text style={styles.buttonText}>View & Purchase</Text>
            </SquircleView>
          </TouchableOpacity>
        </View>
      </View>
    </SquircleView>
  );
};

export default function ExploreScreen() {
  const handleProductPress = (item) => {
    console.log('Product pressed:', item.title);
    // Add your navigation or modal logic here
  };

  const renderProduct = ({ item }) => (
    <ProductCard item={item} onPress={handleProductPress} />
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Featured Products</ThemedText>
      
      <FlatList
        data={productsData}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        // Performance optimizations
        removeClippedSubviews={true}
        maxToRenderPerBatch={3}
        windowSize={5}
        initialNumToRender={2}
        getItemLayout={(data, index) => ({
          length: 583, // Card height + margin
          offset: 583 * index,
          index,
        })}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  listContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  productCard: {
    width: Math.min(350, screenWidth - 40),
    height: 563,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  productImageContainer: {
    width: 330,
    height: 350,
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
  },
  tag: {
    position: 'absolute',
    paddingHorizontal: 10,
    paddingVertical: 5,
    left: 14,
    top: 14,
    minWidth: 69,
    height: 29,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  productInfo: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 20,
    height: 163,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
  },
  productTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#262626',
    textAlign: 'left',
    lineHeight: 32,
  },
  productDescription: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    textAlign: 'left',
    color: 'rgba(38, 38, 38, 0.6)',
  },
  priceButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 42,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  currencyText: {
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(38, 38, 38, 0.5)',
  },
  priceText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#262626',
  },
  purchaseButton: {
    width: 133,
    height: 42,
    backgroundColor: '#EFEFEF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#262626',
  },
});