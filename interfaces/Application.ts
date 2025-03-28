interface Application {
  id: number;
  name: string;
  fields: string;
  resume: {
    id: number;
  };
  score: number;
  createdAt: string;
}

export default Application;
