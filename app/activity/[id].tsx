import { useCallback, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useFocusEffect, useLocalSearchParams, useNavigation } from "expo-router";
import { getActivityDetails, sendActivityCompletion, type ActivityDetails } from "@/utils/RetrieveData";

const Activity = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const [activity, setActivity] = useState<ActivityDetails | null>(null);
  const [loadedId, setLoadedId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loading = loadedId !== id;

  useFocusEffect(useCallback(() => {
    let active = true;

    getActivityDetails(id)
      .then(data => {
        if (active) {
          setActivity(data);
          setError(null);
          setLoadedId(id);
        }
      })
      .catch(loadError => {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : "Unable to load activity details.");
          setLoadedId(id);
        }
      });

    return () => {
      active = false;
    };
  }, [id]));

  const completeActivity = async () => {
    if (!activity || activity.completion >= 100 || saving) return;

    setSaving(true);
    setError(null);
    try {
      await sendActivityCompletion(activity._guid);
      setActivity({
        ...activity,
        completion: 100,
        completedDate: new Date().toISOString(),
      });
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to save activity completion.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-background">
      {loading ? (
        <Text className="text-subtext text-xl">Loading activity...</Text>
      ) : activity ? (
        <>
          <Text className="text-title text-3xl">{activity.title}</Text>
          <Text className="text-subtext text-xl">{activity.description}</Text>
          <Text className="text-text text-xl">{activity.theme} · {activity.approximateTime}</Text>
          {error ? <Text className="text-red-600">{error}</Text> : null}
          <Pressable disabled={activity.completion >= 100 || saving} onPress={completeActivity}>
            <Text className="text-text text-xl">
              {activity.completion===100 ? "Completed" : saving ? "Saving..." : "Mark complete"}
            </Text>
          </Pressable>
        </>
      ) : (
        <Text className="text-subtext text-xl">{error ?? "Activity not found."}</Text>
      )}
      <Pressable onPress={() => navigation.goBack()}><Text className="text-text">Go Back</Text></Pressable>
    </View>
  );
};

export default Activity;
