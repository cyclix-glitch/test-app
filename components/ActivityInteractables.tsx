import clsx from "clsx";
import { useEffect, useState } from "react";
import { Alert, Linking, Pressable, TextInput, View, Text, Image, KeyboardAvoidingView } from "react-native";
import { embedFrame } from "./embed";
import { setAudioModeAsync, useAudioPlayer, useAudioPlayerStatus } from "expo-audio";

function getYouTubeUrl(src:string, isHtml = false):string|null {
    const url = isHtml
        ? src.match(/<iframe\b[^>]*\bsrc\s*=\s*(["'])(.*?)\1/i)?.[2]
        : src;
    if (!url) return null;

    try {
        const parsedUrl = new URL(url);
        const allowedHosts = ["youtube.com", "www.youtube.com", "m.youtube.com", "youtu.be", "youtube-nocookie.com", "www.youtube-nocookie.com"];
        return parsedUrl.protocol === "https:" && allowedHosts.includes(parsedUrl.hostname)
            ? parsedUrl.toString()
            : null;
    } catch {
        return null;
    }
}

function youtubeLink(url:string, accessibilityText:string|null) {
    return <Pressable
        accessibilityRole="link"
        accessibilityLabel={accessibilityText ?? "Open video on YouTube"}
        onPress={() => Linking.openURL(url).catch(() => {
            Alert.alert("Unable to open video", "Please try opening the video again.");
        })}
    >
        <Text>Watch on YouTube</Text>
    </Pressable>;
}

export function multiplechoice(activityDetails:Activity_MultipleChoice){
    return <View>

    </View>
}

export function OpenEnded(activityDetails:Activity_OpenEnded){
    const [text,setText] = useState(activityDetails.PastResponse ?? activityDetails.DefaultText ?? "")
    const [pastResponse,setPastResponse] = useState(activityDetails.PastResponse)
    return <KeyboardAvoidingView>
        <View className="sections-openended">
            <TextInput
                className={clsx("section-openended-text",pastResponse?"section-openended-text-finished":null)}
                editable={!pastResponse}
                placeholder={activityDetails.PromptText??undefined}
                value={text}
                onChangeText={(newText)=>setText(newText)}
            />
            <Pressable
                disabled={Boolean(pastResponse)}
                onPress={()=>setPastResponse(text)}
            >
                <Text className={clsx("sections-openended-submit",pastResponse?"sections-openended-submit-finished":null)}>Submit</Text>
            </Pressable>
        </View>
    </KeyboardAvoidingView>
}

export function connection_game(activityDetails:Activity_Connections){
    return <View></View>

}

export function TextFieldPreview(src:string){
    return <Text>{src}</Text> //download richtext library

}

export function EmbedPreview(src:string,accessibilityText:string|null){
    return embedFrame(src,'html')
}

export function WebPreview(src:string,accessibilityText:string|null){
    return embedFrame(src,'uri')
}

export function ImagePreview({src,accessibilityText}: {src:string; accessibilityText:string|null}){
    return <View>
        <Image
            source={{uri:src}}
            accessibilityLabel={accessibilityText ?? undefined}
            resizeMode="contain"
            style={{width:"100%",height:240}}
        />
    </View>
}

export function AudioPreview({src,accessibilityText}: {src:string; accessibilityText:string|null}){
    const player = useAudioPlayer(src,{downloadFirst:true})
    const status = useAudioPlayerStatus(player)
    const togglePlayback = () => {
        if(status.playing){
            player.pause()
        }else{
            if (status.duration > 0 && status.currentTime>=status.duration){
                player.seekTo(0);
            }
            player.play()
        }
    }

    useEffect(()=>{
        setAudioModeAsync({
            playsInSilentMode:true,
            shouldPlayInBackground:false,
            interruptionMode:'doNotMix'
        })
    })

    return <View className="section-audio">
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${status.playing ? "Pause" : "Play"} audio${accessibilityText ? `: ${accessibilityText}` : ""}`}
            onPress={togglePlayback}
        >
            <Text>{status.playing ? "Pause" : "Play"}</Text>
        </Pressable>
    </View>

}