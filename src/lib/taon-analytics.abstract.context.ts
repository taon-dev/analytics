// THIS FILE IS GENERATED - DO NOT MODIFY
import { TaonSessionAbstractContext } from '@taon-dev/session/src';
import { createContext, TaonBaseContext } from 'taon/src';

import { TaonAnalyticsEventAbstractContext } from './taon-analytics-event/taon-analytics-event.abstract.context';
import { TaonAnalyticsVisitorAbstractContext } from './taon-analytics-visitor/taon-analytics-visitor.abstract.context';
import { TaonAnalyticsSessionAbstractContext } from './taon-analytics-session/taon-analytics-session.abstract.context';
import { TaonAnalyticsPageViewAbstractContext } from './taon-analytics-page-view/taon-analytics-page-view.abstract.context';

export const TaonAnalyticsAbstractContext = createContext(() => ({
  contextName: 'TaonAnalyticsAbstractContext',
  abstract: true,
  contexts: {
    TaonSessionAbstractContext,
    TaonAnalyticsEventAbstractContext,
    TaonAnalyticsVisitorAbstractContext,
    TaonAnalyticsSessionAbstractContext,
    TaonAnalyticsPageViewAbstractContext,
  },
}));

// THIS FILE IS GENERATED - DO NOT MODIFY
