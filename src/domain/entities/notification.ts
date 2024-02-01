interface INotification {
    id: number;
    title: string;
    message: string;
    time: Date;
    profile?: string;
}