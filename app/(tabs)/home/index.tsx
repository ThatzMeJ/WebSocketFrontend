import { View, Text, ScrollView, Pressable, Image } from 'react-native'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'

interface SubscriptionItemProps {
  name: string
  refillDate: string
}

function SubscriptionItem({ name, refillDate }: SubscriptionItemProps) {
  return (
    <View className="flex-row items-center justify-between bg-white rounded-lg p-4 mb-4">
      <View className="flex-row items-center">
        <Image 
          source={require('../../../assets/images/react-logo.png')}
          className="w-12 h-12 rounded-lg"
        />
        <View className="ml-3">
          <Text className="font-semibold">{name}</Text>
          <Text className="text-gray-500">Refills on {refillDate}</Text>
        </View>
      </View>
      <View className="flex-row">
        <Pressable className="mr-3">
          <Text className="text-blue-600">Refill Now</Text>
        </Pressable>
        <Pressable>
          <Text className="text-blue-600">Manage</Text>
        </Pressable>
      </View>
    </View>
  )
}

interface ExploreCardProps {
  title: string
  description: string
  icon: React.ReactNode
  backgroundColor: string
}

function ExploreCard({ title, description, icon, backgroundColor }: ExploreCardProps) {
  return (
    <View style={{ backgroundColor }} className="p-6 rounded-3xl flex-1 m-2">
      <View className="bg-white/20 self-start p-2 rounded-xl mb-4">
        {icon}
      </View>
      <Text className="text-2xl font-semibold mb-2">{title}</Text>
      <Text className="text-base opacity-80">{description}</Text>
    </View>
  )
}

interface ProductReviewCardProps {
  title: string
  image: any
  isLocked?: boolean
}

function ProductReviewCard({ title, image, isLocked }: ProductReviewCardProps) {
  return (
    <View className="bg-white rounded-3xl mr-4 overflow-hidden" style={{ width: 280 }}>
      <Image source={image} className="w-full h-40" resizeMode="cover" />
      {isLocked && (
        <View className="absolute top-4 right-4 bg-[#FF9898] p-2 rounded-lg">
          <Ionicons name="lock-closed" size={20} color="white" />
        </View>
      )}
      <View className="p-4">
        <Text className="text-lg font-semibold mb-2">{title}</Text>
        <View className="flex-row items-center">
          <Image 
            source={require('../../../assets/images/react-logo.png')} 
            className="w-8 h-8"
          />
          <Text className="ml-2 text-gray-600 flex-1">
            Reviewed by OnSkin's team of biochemists and practicing aestheticians
          </Text>
          <Ionicons name="checkmark-circle" size={16} color="#4A90E2" />
        </View>
      </View>
    </View>
  )
}

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="px-4 py-2">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-6">
            <View className="flex-row items-center">
              <Image 
                source={require('../../../assets/images/react-logo.png')}
                className="w-12 h-12 rounded-full"
              />
              <Text className="text-2xl font-bold ml-3">Hi, OnSkinuser_ikpsq!</Text>
            </View>
            <View className="bg-[#FF9898] px-4 py-2 rounded-full">
              <Text className="font-semibold text-white">⭐ PRO</Text>
            </View>
          </View>

          {/* Explore Section */}
          <Text className="text-2xl font-bold mb-4">Explore</Text>
          <View className="flex-row flex-wrap">
            <ExploreCard
              title="Skin Helper"
              description="Got a beauty query? AI will get you sorted."
              backgroundColor="#E8F1FF"
              icon={<Ionicons name="sparkles" size={24} color="#000" />}
            />
            <ExploreCard
              title="Hair Lab"
              description="Check if a hair product suits you."
              backgroundColor="#F8F0FF"
              icon={<Ionicons name="brush" size={24} color="#000" />}
            />
          </View>
          <View className="flex-row flex-wrap mt-2">
            <ExploreCard
              title="Search"
              description="Type a product and see if it's your match."
              backgroundColor="#FFF0F0"
              icon={<Ionicons name="search" size={24} color="#000" />}
            />
            <ExploreCard
              title="Scanner"
              description="Analyze a product by photo or barcode."
              backgroundColor="#E8FFE8"
              icon={<Ionicons name="camera" size={24} color="#000" />}
            />
          </View>

          {/* Product Reviews Section */}
          <View className="mt-8">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-2xl font-bold">Product Reviews</Text>
              <Pressable>
                <Text className="text-[#4A8B6F] font-semibold">See All</Text>
              </Pressable>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <ProductReviewCard
                title="10 Eye Products to Fight Puffiness"
                image={require('../../../assets/images/react-logo.png')}
                isLocked
              />
              <ProductReviewCard
                title="Most Popular Glow Recipe Products"
                image={require('../../../assets/images/react-logo.png')}
              />
            </ScrollView>
          </View>

          {/* Popular Scans Section */}
          <View className="mt-8 mb-4">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-2xl font-bold">Popular Scans</Text>
              <Pressable>
                <Text className="text-[#4A8B6F] font-semibold">See All</Text>
              </Pressable>
            </View>
            {/* Add Popular Scans content here */}
          </View>
        </View>
      </ScrollView>

    
    </SafeAreaView>
  )
} 