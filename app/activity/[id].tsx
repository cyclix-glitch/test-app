import { useCallback, useState } from "react";
import { Pressable, Text, View, Image, ScrollView } from "react-native";
import { useFocusEffect, useLocalSearchParams, useNavigation } from "expo-router";
import {
  getActivityDetails,
  isActivitySection,
  sendActivityCompletion,
  type ActivityDetails,
} from "@/utils/RetrieveData";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { multiplechoice,OpenEnded,connection_game,EmbedPreview,TextFieldPreview,WebPreview,ImagePreview,AudioPreview } from "@/components/ActivityInteractables";
import clsx from "clsx";

const Activity = () => {
  const insets = useSafeAreaInsets();
  const { id, completedSection } = useLocalSearchParams<{ id: string; completedSection?: string }>();
  const navigation = useNavigation();
  const parsedCompletedSection = Number(completedSection);
  const initialSection = Number.isInteger(parsedCompletedSection) && parsedCompletedSection >= 0
    ? parsedCompletedSection: 0;
  const [activity, setActivity] = useState<ActivityDetails | null>(null);
  const [completed, setCompleted] = useState(false);
  const [loadedId, setLoadedId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loading = loadedId !== id;
  const [section, setSection] = useState(initialSection);
  const totalSections = activity?activity.sections.length:null
  const sectionDetails = activity?activity.sections[section]:null

  useFocusEffect(useCallback(() => {
    let active = true;

    getActivityDetails(id)
      .then(details => {
        if (active) {
          setActivity(details);
          setSection(initialSection >= details.sections.length ? 0 : initialSection);
          setCompleted(false);
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
  }, [id, initialSection]));

  const progressSection = async() => {
    if (!activity || completed || saving || !totalSections) return;
    setSaving(true);
    setError(null);
    try {
      await sendActivityCompletion(activity._guid,section+1);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to save activity completion.");
    } finally {
      setSaving(false);
      if (section+1>=totalSections){
        setCompleted(true);
        navigation.goBack()
      } else {
        setSection(section+1)
      }
    }
  }

  const renderElement = (componentData: { type: "picture" | "web" | "audio" | "text" | "embed"; src: string; accessibility_text: string | null; }) => {
    switch(componentData.type){
      case "picture":
        return <ImagePreview src = {componentData.src} accessibilityText={componentData.accessibility_text} />;
      case "web":
        return WebPreview(componentData.src,componentData.accessibility_text);
      case "audio":
        return <AudioPreview src={componentData.src} accessibilityText={componentData.accessibility_text} />;
      case "text":
        return TextFieldPreview(componentData.src);
      case "embed":
        return EmbedPreview(componentData.src,componentData.accessibility_text);
      default: return null;
    }
  }

  const renderInteractable = (data: unknown) => {
    if (!isActivitySection(data)) {
      return null;
    }
    switch(data.page_type){
      case "multiple_choice":
        return multiplechoice(data);
      case "open_ended":
        return <OpenEnded key={`${id}-${section}`} {...data} />;
      case "connections":
        return connection_game(data);
      default:
        return null;
    }
  }

  return (
    <View className="flex-1 bg-background">
      <View className="items-center">
        <View className="w-screen flex-row items-center pb-6 px-10" style={{paddingTop:insets.top+22}}>
          <Pressable onPress={() => navigation.goBack()}>
            <Text className="section-exit">
              X
            </Text>
          </Pressable>
          <Text className="section-header-title">
            {loading?"Loading activity...":activity?activity.title:"null"}
          </Text>
          <Text className="section-audio">
            Audio
          </Text>
        </View>
        <View className="flex-row mx-[5%]">
          <View className="section-progress">
            <View className="section-bar" style={{width:(totalSections===null?"100%":Math.round((section+1)/totalSections*100)+'%')}} />
          </View>
          <Text numberOfLines={1} className="section-header-count">{totalSections===null?"???":((section+1).toString()+' of '+totalSections.toString())}</Text>
        </View>
        {error ? <Text className="text-red-600 text-center">{error}</Text> : null}
      </View>
      <ScrollView style={{marginLeft:insets.left,marginRight:insets.right,marginBottom:insets.bottom}}>
        <View className="mx-10 mt-5 mb-20">
          {loading ? (
            <Text className="text-subtext text-xl">Loading activity...</Text>
          ) : sectionDetails ? (
            <>
              {/* Display top header */}
              <Text className="section-title">{sectionDetails.title}</Text>
              {sectionDetails.subtitle!==null?<Text className="section-subtitle">{sectionDetails.subtitle}</Text>:null}
              <View className="h-8"/>
              {/* Display elements */}
              {sectionDetails.elements!==null?sectionDetails.elements.map((element,index) => (
                 <View key={index}>
                  {renderElement(element)}
                </View>
              )):null}

              {/* Display tail elements */}
              {sectionDetails.subtext!==null?<View className="flex-row mb-8">
                {sectionDetails.subtext_icon!==null?<Image src={sectionDetails.subtext_icon}/>:null}
                <Text className="section-subtext">{sectionDetails.subtext}</Text>
              </View>:null}

              {/* Display interactables */}
              {sectionDetails.page_type==="none"?null:renderInteractable(sectionDetails)}

              {/* Display previous & next page element */}
              <View className="flex-row justify-around">
                {section!==0?
                  <Pressable className="section-next" disabled={completed || saving} onPress={()=>setSection(section-1)}>
                    <Text className="section-switch-text">Go back</Text>
                  </Pressable>:null
                }
                <Pressable className="section-next" disabled={completed || saving} onPress={progressSection}>
                  <Text className="section-switch-text">
                    {completed ? "Completed" : saving ? "Saving..." : sectionDetails.next_page_text || "Proceed"}
                  </Text>
                </Pressable>
              </View>
              
            </>
          ) : (
            <Text className="text-subtext text-xl">{error ?? "Activity/Section not found."}</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Activity;
