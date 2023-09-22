export interface singleEvent {
  id: number;
  title: string;
  hidden: boolean;
  description?: string | undefined;
  userId: string;
  length: string;
  createdAt: Date;
}
