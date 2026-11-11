import { Link } from "expo-router";
import { Pressable, View, Text, Image, type ImageSourcePropType } from "react-native";
import { clsx } from "clsx";

import { icons } from "@/constants/icons";
import { colors, themeColors } from "@/constants/theme";

function getImageSource(name: string|undefined): ImageSourcePropType {
  if (name && Object.hasOwn(icons,name)){
    let myKey = name as keyof typeof icons;
    return icons[myKey]
  }else{
    return icons.housesolidfull
  }
}

function getImageColor(name: string|undefined) {
  if (name && Object.hasOwn(themeColors,name)){
    let myKey = name as keyof typeof themeColors; 
    return themeColors[myKey]
  } else {
    return themeColors.grey;
  }
}

function mixWithBlack(color: string): string {
  const channels = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(color);
  if (!channels) {
    throw new Error(`Expected a six-digit hex color, received "${color}"`);
  }

  return `#${channels.slice(1).map(channel =>
    Math.round(parseInt(channel, 16) * 0.65).toString(16).padStart(2, "0")
  ).join("")}`;
}

export default function Card({_guid,title,description,approximateTime,theme,index,completedSection,totalSections,icon,color}:Activity){
  const imageColor = getImageColor(color)
  const iconColor = mixWithBlack(imageColor);
  return (
    <Link href={{pathname:"/activity/[id]",params:{id:_guid,completedSection:(completedSection ?? 0).toString()}}} asChild>
      <Pressable>
        <View className="activity-card">
          <View className={clsx("activity-card-image","flex-6 md:flex-4")} style={{backgroundColor: imageColor}} >
            <Image source={getImageSource(icon)} className="p-[5%] object-contain w-full h-auto aspect-[0.85]" style={{ tintColor: iconColor }}/>
          </View>
          <View className="flex-1"></View>
          <View className="flex-17">
            <Text numberOfLines={1} ellipsizeMode="tail" className="text-3xl text-title">{title}</Text>
            <Text numberOfLines={2} ellipsizeMode="tail" className="text-xl font-light text-subtext mt-3">{description}</Text>
            <Text className="text-xl font-semibold text-text mt-2">{
            approximateTime+' \u{2022} '+theme+' \u{2022} '+(completedSection?Math.round((completedSection)/totalSections*100).toString()+"% Explored":(index===0?"Up Next":"Try it"))
            }</Text>
          </View>
          <View className="flex-1 items-start py-[2%]">
            <Image source={completedSection===totalSections?icons.completed:icons.chevron} className="flex-1 object-contain w-full h-auto aspect-square" style={{ tintColor: colors.subtext }}/>
            <View className="w-full h-max flex-9"/>
          </View>
          
        </View>
      </Pressable>
    </Link>
  )
}