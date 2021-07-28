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
