declare module "*.module.scss" {
  const styles: Record<string, string>;
  export default styles;
}

declare module "*.ink" {
  const url: import("./types").ResourceURL;
  export default url;
}
