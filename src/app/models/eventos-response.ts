export interface EventosResponse {
    kind?: string;
    etag?: string;
    summary?: Summary;
    updated?: Date;
    timeZone?: TimeZone;
    accessRole?: string;
    defaultReminders?: DefaultReminder[];
    nextSyncToken?: string;
    items?: Eventos[];
}
export interface DefaultReminder {
    method: string;
    minutes: number;
}
export interface Eventos {
    conferenceDataVersion?: number;
    sendNotifications?: boolean;
    attendees?: Attendee[];
    eventId?:string | number;
    kind?: string;
    etag?: string;
    id?: string;
    status?: string;
    htmlLink?: string;
    created?: Date;
    updated?: Date;
    description?: string;
    creator?: Creator;
    organizer?: Creator;
    iCalUID?: string;
    sequence?: number;
    hangoutLink?: string;
    reminders?: Reminders;
    eventType?: string;
    transparency?: string;
    end: {
        dateTime?: Date;
        date?: Date;
    };
    start: {
        dateTime?: Date;
        date?: Date;
    };
    conferenceData: {
        createRequest?: {
          requestId?: string
        }
      }
    summary?: string;
    calendarId?: string;
    requestId?: string;
    
    
}

export interface Status {
    statusCode: string;
}
export interface EntryPoint {
    entryPointType: EntryPointType;
    uri: string;
    label?: string;
    pin?: string;
    regionCode?: string;
}
export enum EntryPointType {
    More = "more",
    Phone = "phone",
    Video = "video",
}
export interface Creator {
    email: Summary;
    displayName: DisplayName;
    self: boolean;
}
export enum DisplayName {
    Generica2 = "Generica 2",
}
export enum Summary {
    Generica2TotalplayCOMMX = "generica2@totalplay.com.mx",
}
export interface End {
    dateTime?: Date;
    timeZone?: TimeZone;
    date?: Date;
}
export enum TimeZone {
    AmericaLosAngeles = "America/Los_Angeles",
    AmericaMexicoCity = "America/Mexico_City",
}
export interface Reminders {
    useDefault: boolean;
}
export interface CalendarEvent<MetaType = any> {
    id?: string | number;
    start: Date;
    end?: Date;
    title?: string;
    correo?: string;
    color?: string;
    actions?: string[];
    allDay?: boolean;
    cssClass?: string;
    resizable?: {
        beforeStart?: boolean;
        afterEnd?: boolean;
    };
    draggable?: boolean;
    meta?: MetaType;
    meet?: string;
    invitados?: string[];
    calendarId?:string,
    showDeleted?: boolean,
    singleEvents?: boolean,
    transparency?: string
}
export interface Attendee {
    email?: string;
    responseStatus?: string;
    displayName?: string;
    organizer?: boolean;
    self?: boolean;
}