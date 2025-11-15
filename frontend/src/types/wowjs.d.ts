declare module "wowjs" {
  export default class WOW {
    constructor(options?: Record<string, unknown>);
    init(): void;
  }
}
