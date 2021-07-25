declare type FollowInfo = {
  id: number,
  nickname: string,
  imagePath: strring
}

declare type FollowListResponse = {
  follows: Array<FollowInfo>,
  pageToken: number|null
}