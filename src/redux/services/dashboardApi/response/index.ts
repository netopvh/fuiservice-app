export interface IDashboardInfoResponse {
    waiting: number;
    processing: number;
    inTransit: number;
    delivered: number;
    canceled: number;
}