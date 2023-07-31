export interface Plugin {
    id: string
    title: string
    description: string
    isDisabled: boolean
    isActive: boolean
}

export interface Tabs {
    id: string
    title: string
    icon: string
    plugins: Plugin[]
}

export interface TabData {
    title: string
    icon: string
    active: string[]
    disabled: string[]
    inactive: string[]
}

export interface Plugin {
    title: string
    description: string
}

export interface Data {
    tabs: string[]
    tabdata: {
        [key: string]: TabData
    }
    plugins: {
        [key: string]: Plugin
    }
}

export interface GetResponseModel {
    data: Data
    errors: string
}

export interface BulkUpdateRequestModel {
    allEnabled: boolean
}

export interface UpdateRequestModel {
    id: string
    tabId: string
    isActive: boolean
}