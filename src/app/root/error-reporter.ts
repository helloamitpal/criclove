import * as Rollbar from 'rollbar';
import { InjectionToken } from '@angular/core';

export function rollbarFactory(): Rollbar {
  const rollbarConfig = {
    accessToken: '451e1f050a82434b897eae1777eaaa38',
    captureUncaught: true,
    captureUnhandledRejections: true,
  };

  return new Rollbar(rollbarConfig);
}

export const RollbarService = new InjectionToken<Rollbar>('rollbar');
