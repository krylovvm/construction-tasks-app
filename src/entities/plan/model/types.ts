export interface Plan {
  id: string;
  userId: string;
  name: string;
  image: string; // base64 string
  createdAt: number;
  updatedAt: number;
}
