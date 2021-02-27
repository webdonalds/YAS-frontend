declare type VideoPostInfo = {
    id: number,
    videoId: string,
    userId: number,
    title: string,
    description: string,
    totalLikes: number,
    tags: Tag[],
    createdAt: string,
    updatedAt: string
};

declare type VideoPostInfoWithUser = {
    user: UserData
} & VideoPostInfo;

declare type Tag = {
    tagName: string
};

declare type VideoPostsResponse = {
    videoList: Array<VideoPostInfoWithUser>,
    pageToken: number|null
}