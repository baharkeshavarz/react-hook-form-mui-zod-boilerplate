type NetworkLoadingState = {
  state: "loading";
};
type NetworkFailedState = {
  state: "failed";
  code: number;
};
type NetworkSuccessState = {
  state: "success";
  response: {
    title: string;
    duration: number;
    summary: string;
  };
};

type NetworkState =
  | NetworkLoadingState
  | NetworkFailedState
  | NetworkSuccessState;

const a: NetworkState = {
  state: "failed",
  code: 111
};
console.log(a);

type Laptop = {
  type: "laptop";
  screenSize: number;
};

type Headphone = {
  type: "headphone";
  ANC: number;
};

type Product = {
  name: string;
  price: number;
} & (Laptop | Headphone);

const b: Product = {
  name: "Bahar",
  price: 111,
  type: "headphone",
  ANC: 55555
};
console.log(b);
