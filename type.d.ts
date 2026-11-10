declare global {
    interface Activity {
        _guid: string,
        isActive: boolean,
        index?: number,
        completion: number,
        completedDate?: string,
        title: string,
        description: string,
        color?: string,
        icon: string,
        theme: string,
        approximateTime: string
    }
}

export {};