export const ACTIVITIES: Activity[] = [
    // Is displayed for activity list
    // Indiividual components are the details shown to clinicians for analysis & configuration
    {
        "_guid": "1",
        "isActive": true,
        "index": 0,
        "completedSection": undefined,
        "totalSections": 3,
        "mostRecentDate": "2026-03-18T09:00:00.000Z",
        "title": "Activity Name A",
        "description": "This should be a brief description of the activity.",
        "color": "red",
        "icon": "calendarsolidfull",
        "theme": "Feelings",
        "approximateTime": "4 min"
    },
    {
        "_guid": "2",
        "isActive": true,
        "index": 1,
        "completedSection": 2,
        "totalSections": 5,
        "mostRecentDate": "2026-03-18T09:00:00.000Z",
        "title": "Activity Name B",
        "description": "This should be a brief description of the activity.",
        "color": "purple",
        "icon": "globesolidfull",
        "theme": "Speech",
        "approximateTime": "10 min"
    }
]

export const ACTIVITY_DETAILS:{_guid:string,title:string,sections:(PageEssentials|Activity_MultipleChoice|Activity_OpenEnded|Activity_Connections)[]}[] = [
    //Is downloaded upon opening an activity
    //Each index represents a section
    {
        _guid:"1",
        title:"Activity A",
        sections: [
            {
                title:"Section A",
                subtitle: "This is the first page",
                elements: null,
                subtext_icon: null,
                subtext: "Let us proceed.",
                next_page_text: "Proceed.",
                page_type:"none"
            },
            {
                title:"Section B",
                subtitle: "This is the second page",
                elements: [
                    {
                        type:"picture",
                        src:'https://media.istockphoto.com/id/187722063/photo/funny-man-with-watermelon-helmet-and-goggles.jpg?s=612x612&w=0&k=20&c=gRAm8vtLqdOU8a-mJVt6m_Wnv8pLpa3TBh2vRQP4208=',
                        accessibility_text:"Watermelon"
                    },
                    {
                        type:"embed",
                        src:'<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;"><iframe src="https://drive.google.com/file/d/1ohJOXqPlOSCn0W0Vl8W7RJ-UwiNJJeAl/preview" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen scrolling="no" allow="encrypted-media *;"></iframe></div>',
                        accessibility_text:"HTML Integration"
                    },
                    // {
                    //     type:"web",
                    //     src:'https://www.youtube.com/watch?v=l435o7AhDLQ',
                    //     accessibility_text:"Peak music gng"
                    // }
                ],
                subtext_icon: "housesolidfull",
                subtext: "Elements test",
                next_page_text: "Proceed.",
                page_type:"multiple_choice",
                Options:[{icon:null,text:"Option A"},{icon:null,text:"Option B"},{icon:null,text:"Option C"}],
                CorrectOptions:[0],
                WrongMessage:"That's the wrong option!",
                CorrectMessage:"That's the correct option!"
            },
            {
                title:"Section C",
                subtitle: "This is the second page",
                elements: [
                    {
                        type:"text",
                        src:'Test test test',
                        accessibility_text:null
                    },
                    {
                        type:"audio",
                        src:'https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3',
                        accessibility_text:null
                    },
                ],
                subtext_icon: null,
                subtext: "Elements test 2",
                next_page_text: "Proceed.",
                page_type:"open_ended",
                DefaultText:"",
                PromptText:"What is 2+2?",
                CorrectAnswer:"4",
                ModelAnswer:"2+2=4",
                PastResponse:null
            }
        ]
        
    }
]