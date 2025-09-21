import axiosInstance from '../axiosInstance';

interface ICategoriesResponse {
  href: string;
  icons: {
    height: number;
    url: string;
    width: number;
  }[];
  id: string;
  name: string;
}

export const getCategories = async (): Promise<ICategoriesResponse[]> => {
  const res = await axiosInstance.get(
    '/browse/categories?country=KR&locale=ko_KR&limit=10&offset=5',
  );

  return res.data.categories.items;
};
