export interface Blog {
  title: string,
  id: number,
  body: string,
  commentList: Comment[]
}

export interface Comment {
  postId: number,
  id: number,
  name: string,
  email: string,
  body: string
}

export interface BlogState {
  title: string
  blogList: Blog[] 
  isLoading: boolean
  blogPost: Blog | null
  commentList: Comment[]
}
export interface Photos {
  title: string
  id: number
  thumbnailUrl: string
  albumId: number
}
export interface Album {
  title: string
  id: number
 }
export interface AlbumState {
  title: string
  albumList: Album[]
  isLoading: boolean
  album: Photos[] | null
}