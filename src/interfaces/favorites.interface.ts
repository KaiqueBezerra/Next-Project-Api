export interface Favorite {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  projectId: string;
}

export interface AddFavorite {
  userId: string;
  projectId: string;
}

export interface GetFavorite {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  projectId: string;
  Project: {
    id: string;
    name: string;
    description: string;
  };
}

export interface FavoriteRepository {
  addFavorite(data: AddFavorite): Promise<void>;
  deleteFavorite(data: AddFavorite): Promise<void>;
  findFavoritesByUserId(userId: string): Promise<GetFavorite[]>;
  favoritesVerify(userId: string, projectId: string): Promise<boolean>;
}
