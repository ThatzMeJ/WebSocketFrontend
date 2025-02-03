import { View, Text, ScrollView, Pressable, Image } from 'react-native'

import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'


interface TreatmentCardProps {
  title: string
  tag?: string
  href: string
}

function TreatmentCard({ title, tag, href }: TreatmentCardProps) {
  return (
    <Link href={href as any} asChild>
      <Pressable className="bg-white rounded-lg p-4 mr-4 w-32">
        <Text className="font-semibold">{title}</Text>
        {tag && (
          <View className="mt-2">
            <Text className="text-purple-600 text-sm">{tag}</Text>
          </View>
        )}
      </Pressable>
    </Link>
  )
}

export default function CareScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-4">
        <View className="mt-4 mb-6">
          <Text className="text-2xl font-bold">Care</Text>
          <Text className="text-purple-600 mt-1">
            The support you need, when you need it.
          </Text>
          <Text className="text-purple-600">Meet your Care Team.</Text>
        </View>

        {/* Medical Team Card */}
        <View className="bg-white p-4 rounded-lg mb-6">
          <Text className="text-xl font-semibold mb-2">Medical Team</Text>
          <Text className="text-gray-600 mb-4">
            A team of licensed medical experts dedicated to your care.
          </Text>
          <View className="flex-row">
            <Image 
              source={require('../../assets/images/react-logo.png')}
              className="w-10 h-10 rounded-full"
        
            />
            <Image 
              source={require('../../assets/images/react-logo.png')}
              className="w-10 h-10 rounded-full -ml-2"
             
            />
            <View className="w-10 h-10 rounded-full bg-purple-100 -ml-2 items-center justify-center">
              <Text className="text-purple-600">...</Text>
            </View>
          </View>
        </View>

        {/* Explore Treatments Section */}
        <View className="mb-6">
          <Text className="text-xl font-semibold mb-2">Explore treatments</Text>
          <Text className="text-purple-600 mb-4">Our most popular programs</Text>
          
          {/* Popular Section */}
          <Text className="text-gray-500 mb-2">Popular</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <TreatmentCard title="Sexual health" href="/(tabs)/care" />
            <TreatmentCard title="Genital herpes" href="/(tabs)/care" />
          </ScrollView>

          {/* New Section */}
          <Text className="text-gray-500 mb-2">New</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TreatmentCard 
              title="Find your custom medication kit" 
              href="/(tabs)/care"
              tag="New"
            />
            <TreatmentCard 
              title="Identify your eating pattern" 
              href="/(tabs)/care"
              tag="New"
            />
            <TreatmentCard 
              title="Learn evidence based kit" 
              href="/(tabs)/care"
              tag="New"
            />
          </ScrollView>
        </View>

        {/* Categories */}
        <View className="mb-6">
          <Link href="/" asChild>
            <Pressable className="mb-4">
              <Text className="font-semibold">Weight Loss</Text>
            </Pressable>
          </Link>
          <Link href="/" asChild>
            <Pressable>
              <Text className="font-semibold">Hair & Skin</Text>
            </Pressable>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
} 