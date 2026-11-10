export const colors = {
    background: "#FAF8F3",
    title: "#263D37",
    text: "#286C59",
    subtext: "#68766E",
    card: "#FFFFFF",
    border: "#E2E6DE"
} as const;

export const themeColors = {
    red: "#F5D6BE",
    green: "#E5EFE5",
    blue: "#DFEAF0",
    yellow: "#F3E8B4",
    purple: "#E6DFF3",
    pink: "#FF99C8",
    orange: "#FFC067",
    grey: "#D3D3D3"
} as const;

export const spacing = {
    0:0,
    .5:2,
    1:4,
    2:8,
    3:12,
    4:16,
    5:20,
    6:24,
    7:28,
    8:32,
    9:36,
    10:40,
    11:44,
    12:48,
    14:56,
    15:60,
    16:64,
    17:68,
    18:72,
    19:76,
    20:80,
} as const;

export const components = {
    tabBar:{
        height: spacing[20],
        horizontalInset: spacing[6],
        radius: spacing[12],
        iconFrame: spacing[12],
        itemPaddingVertical: spacing[2],
    }
} as const;

export const theme = {
    colors,
    themeColors,
    spacing,
    components
} as const;