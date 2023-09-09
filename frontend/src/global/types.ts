export interface RouteType {
  path: string;
  component?: React.ComponentType<any> | React.FC<any>;
  title: string;
  isNavLinked: boolean;
  subMenu: any[] | undefined;
  externalLink?: string;
}
