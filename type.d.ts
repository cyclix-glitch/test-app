declare global {
    interface Activity {
        _guid: string,
        isActive: boolean,
        index?: number,
        completedSection?: number,
        totalSections:number,
        mostRecentDate?: string,
        title: string,
        description: string,
        color?: string,
        icon: string,
        theme: string,
        approximateTime: string
    }
    type PageEssentials = {
        title: string,
        subtitle: string|null,
        elements:{
            type:"picture"|"audio"|"text"|"embed"|"web",
            src:string,
            accessibility_text:string|null
        }[]|null,
        subtext_icon: string|null,
        subtext: string|null,
        next_page_text: string|null,
        page_type: "none"
    }
    type Activity_MultipleChoice = Omit<PageEssentials, "page_type"> & {
        page_type: "multiple_choice",
        Options:{
            icon: string|null,
            text: string
        }[]
        
        CorrectOptions: number[]
        WrongMessage: string|null
        CorrectMessage: string|null
    }
    type Activity_OpenEnded = Omit<PageEssentials, "page_type"> & {
        page_type: "open_ended",
        DefaultText:string|null,
        PromptText:string|null,
        CorrectAnswer:string|null,
        ModelAnswer:string|null,
        PastResponse:string|null
    }
    type Activity_Connections = Omit<PageEssentials, "page_type"> & {
        page_type: "connections",
        Pairings:[left:string,right:string][]
    }
}

export {};