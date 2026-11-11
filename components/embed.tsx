import { WebView } from "react-native-webview"

export function embedFrame(src:string,type:"html"|"uri"){
    return type==="html"
        ? <WebView
            className="aspect-video w-1/2 h-auto"
            source={{html:src}}
            style={{aspectRatio:16/9, width:"100%",height:"auto"}}
            javaScriptEnabled
            domStorageEnabled
            allowsInlineMediaPlayback
        />
        : <WebView
            className="aspect-video w-1/2 h-auto"
            source={{uri:src}}
            style={{aspectRatio:16/9, width:"100%",height:"auto"}}
            javaScriptEnabled
            domStorageEnabled
        />
}