interface Route {
  path: string;
  element: Function;
}

export interface RouterProps {
  routes: Route[];
}
