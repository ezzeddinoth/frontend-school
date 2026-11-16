export interface ISubscription {
  day: string;
  menu: string;
}

export interface IStudent {
  id: number;
  name: string;
  subscription: ISubscription[];
}

export interface IStudentPost {
  name: string;
}
