export interface IComment {
    postId: number;
    author_name: string;
    comment: string;
    created_at: string;
    full_name: string;
}

export interface IUserInfo {
    full_name: string;
    city: string;
    country: string;
    bio: string;
    email: string;
    isAuthenticated: boolean;
    photo: string;
    token: string;
}

export interface IPost {
    id: number;
    title: string;
    excerpt: string;
    photo: string;
    description: string;
    country: string;
    city: string;
    comments: IComment[];
    userInfo: IUserInfo;
}

export type Posts = IPost[];