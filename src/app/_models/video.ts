export interface Video {
    id: string;
    name: string;
    state: string;
    duration: number;
    created: string;
    thumbnailId: string;
    base64ThumbnailImage: string;
    accessToken: string;
    embedPlayerUrl: string;
    embedInsightsUrl: string;
}
