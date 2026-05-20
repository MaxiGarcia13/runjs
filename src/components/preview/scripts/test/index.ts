import { expect } from './expect';
import { spyOn } from './spy';

declare global {
  interface Window {
    expect: typeof expect;
    spyOn: typeof spyOn;
  }
}

window.expect = expect;
window.spyOn = spyOn;
