interface Application {
  id: number;
  name: string;
  fields: string;
  resume: {
    id: number;
    extra: string;
  };
  createdAt: string;
}

export default Application;
