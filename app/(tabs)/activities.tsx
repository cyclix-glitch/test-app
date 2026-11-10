import "@/global.css"
import { Text, View, FlatList, Pressable } from "react-native";
import { useFocusEffect } from "expo-router";

import ActivityCard from "@/components/Card"
import {FILTERS} from "@/constants/data"
import { getActivityList } from "@/utils/RetrieveData"

import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context"
import { styled } from "nativewind";
import { useCallback, useMemo, useState } from "react";
import { clsx } from "clsx";
const SafeAreaView = styled(RNSafeAreaView);

export default function App() {
  const [activityList,setActivityList] = useState<Activity[]>([])
  const [selectedFilter,setFilter] = useState("All Activities")
  const [refreshing,setRefreshing] = useState(false)
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState<string | null>(null)

  const loadActivityList = useCallback(() => {
    return getActivityList()
      .then(data => {
        setError(null)
        setActivityList(data)
      })
      .catch(loadError => {
        setError(loadError instanceof Error ? loadError.message : "Unable to load activities.")
      })
      .finally(() => setLoading(false))
  }, [])

  useFocusEffect(useCallback(() => {
    void loadActivityList()
  }, [loadActivityList]))

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await loadActivityList()
    } finally {
      setRefreshing(false)
    }
  }, [loadActivityList])

  const UpdateFilter = (filter:string) => {
    setFilter(filter);
  };
  const visibleActivityList = useMemo(
    () => activityList.filter(item => selectedFilter === "All Activities" || item.theme === selectedFilter),
    [activityList, selectedFilter],
  )

  return (
    <SafeAreaView className="flex-1 bg-background p-6">
      <FlatList
        ListHeaderComponent={() => { return(
          <View className="pb-10">
            <Text className="home-greeting">Practice Arena</Text>
            <Text className="home-subtext">Learn learn learn learn learn. Lorem Ipsum.</Text>
            <FlatList
              className="h-fit w-max mt-8"
              data={FILTERS}
              renderItem={({item}) => <Pressable
                onPress={() => UpdateFilter(item)}
              >
                <Text
                  className={clsx("activity-filter-pill",(selectedFilter===item)?"activity-filter-pill-selected":null)}
                >{item}</Text>
              </Pressable>
              
              }
              keyExtractor={item => item}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
            <View className="flex-row items-center mt-8">
              <Text className="activity-title">Explore at your pace</Text>
              <Text className="activity-counter">{visibleActivityList.length===1?"1 Activity":visibleActivityList.length+" Activities"}</Text>
            </View>
            
          </View>
          
        )}}
        className="ActivityList"
        data={visibleActivityList}
        renderItem={({item}) => <ActivityCard {...item} />}
        keyExtractor={item => item._guid}
        ListEmptyComponent={
          <Text className="subtext">{error ?? (loading || refreshing ? "Loading activities..." : "No upcoming activities yet")}</Text>
        }
        ItemSeparatorComponent={<View className="h-5"></View>}
        ListFooterComponent={
         <Text className={clsx("subtext","mt-10 mb-30")}>You can revisit any activity. Practice isn&apos;t a test.</Text>
        }
        refreshing = {refreshing}
        onRefresh={onRefresh}
      />
      
    </SafeAreaView>
  );
}