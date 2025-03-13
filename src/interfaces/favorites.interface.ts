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

export interface FavoriteRepository {
  addFavorite(data: AddFavorite): Promise<Favorite>;
  deleteFavorite(data: AddFavorite): Promise<void>;
  favoritesVerify(userId: string, projectId: string): Promise<boolean>;
}
