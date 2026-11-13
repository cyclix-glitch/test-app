import clsx from "clsx";
import { use, useEffect, useState } from "react";
import { Pressable, TextInput, View, Text, Image, KeyboardAvoidingView, useWindowDimensions, LayoutChangeEvent } from "react-native";
import { embedFrame } from "./embed";
import { setAudioModeAsync, useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { colors } from "@/constants/theme";

export function multiplechoice(activityDetails:Activity_MultipleChoice){
    return <View>

    </View>
}

export function OpenEnded(activityDetails:Activity_OpenEnded){
    const [text,setText] = useState(activityDetails.PastResponse ?? activityDetails.DefaultText ?? "")
    const [pastResponse,setPastResponse] = useState(activityDetails.PastResponse)
    
    const [correct, setCorrect] = useState<null|boolean>(null)

    const SubmitAnswer = () => {
        if (pastResponse !== null || !text.trim()) return;

        setPastResponse(text)
        if (activityDetails.CorrectAnswer !== null){
            const normalizeAnswer = (answer: string) => answer.replace(/\s+/g, '').toLowerCase()
            setCorrect(normalizeAnswer(text) === normalizeAnswer(activityDetails.CorrectAnswer))
        }
    }

    return <KeyboardAvoidingView className="items-center">
        <View className="section-openended">
            <View className={clsx("w-full h-10",correct===null?"bg-pastel-purple":correct===true?"bg-pastel-green":"bg-pastel-red")} />
            <TextInput
                className={clsx("section-openended-text",pastResponse !== null?"section-openended-text-finished":null)}
                editable={pastResponse === null}
                placeholder={activityDetails.PromptText??undefined}
                placeholderTextColor={colors.subtext}
                multiline={true}
                value={text}
                onChangeText={(newText)=>setText(newText)}
            />
        </View>
        <Pressable
            disabled={pastResponse !== null || !text.trim()}
            onPress={SubmitAnswer}
        >
            <Text className={clsx("sections-openended-submit",pastResponse !== null?"sections-openended-submit-finished":null)}>Submit</Text>
        </Pressable>
        {(pastResponse!==null&&activityDetails.ModelAnswer!==null)?
            <View>
                <Text>
                    {activityDetails.ModelAnswer}
                </Text>
            </View>:null
        }
    </KeyboardAvoidingView>
}

export function connection_game(activityDetails:Activity_Connections){
    return <View></View>

}

export function TextFieldPreview(src:string){
    return <Text className="font-[ui-rounded] text-xl text-title">{src}</Text> //download richtext library
}

export function EmbedPreview(src:string,accessibilityText:string|null){
    return <View className="mb-8">
        {embedFrame(src,'html')}
    </View>
}

export function WebPreview(src:string,accessibilityText:string|null){
    return embedFrame(src,'uri')
}

export function ImagePreview({src,accessibilityText}: {src:string; accessibilityText:string|null}){
    const [aspectRatio, setAspectRatio] = useState<number>(1); // Fallback ratio
    const {width:screenWidth,height:screenHeight} = useWindowDimensions();
    const maxImageWidth = screenWidth * 0.6;
    const maxImageHeight = screenHeight * 0.6;
    const imageWidth = Math.min(maxImageWidth,maxImageHeight * aspectRatio);
    const imageHeight = imageWidth / aspectRatio;
    const [textHeight, setTextHeight] = useState<number>(0);
    const [magnified, setMagnified] = useState(false);

    const handleLayout = (event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout;
        setTextHeight(height);
    };

    useEffect(() => {
    Image.getSize(src, (width, height) => {
      if (width && height) {
        setAspectRatio(width / height);
      }
    });
    }, [src]);
    return <View className="w-full bg-border overflow-hidden align-middle items-center rounded-3xl" style={{height:imageHeight+textHeight}}>
        <Image
            source={{uri:src}}
            accessibilityLabel={accessibilityText ?? undefined}
            resizeMode={magnified?"cover":"contain"}
            style={{width:"100%",height:imageHeight}}
        />
        <Pressable 
            onPress={()=>setMagnified(!magnified)}
            className="bg-white" style={{
                position:"absolute",
                right:10,
                top:10
            }}>
            <Text>Magnify</Text>
        </Pressable>
        {accessibilityText?<Text
            onLayout={handleLayout}
            className="section-accessibility"
        >{accessibilityText}</Text>:null}
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

    return <View className="section-audiobox">
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${status.playing ? "Pause" : "Play"} audio${accessibilityText ? `: ${accessibilityText}` : ""}`}
            onPress={togglePlayback}
        >
            <Text>{status.playing ? "Pause" : "Play"}</Text>
        </Pressable>
    </View>

}