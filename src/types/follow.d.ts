declare type FollowInfo = {
  id: number,
  nickname: string,
  imagePath: string,
  aboutMe: string
}

declare type FollowListResponse = {
  follows: Array<FollowInfo>,
  pageToken: number|null
}

declare type IsFollowingResponse = {
  isFollowing: boolean
}

declare type PostFollowResponse = {
  followerId: number,
  followeeId: number
}

declare type DeleteFollowResponse = {
  message: string
}
