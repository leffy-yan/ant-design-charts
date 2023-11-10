import { flow, transformOptions, set } from '../../utils';
import { mark } from '../../components';
import type { Adaptor } from '../../types';
import type { ViolinOptions } from './type';

type Params = Adaptor<ViolinOptions>;

/**
 * @param chart
 * @param options
 */
export function adaptor(params: Params) {
  /**
   * 图表差异化处理
   */

  const init = (params: Params) => {
    return params
  }

  const customTransform = (params: Params) => {
    const { options } = params;
    if (options.violinType === 'polar') {
      set(options, 'coordinate', { type: 'polar'})
    } else if (options.violinType === 'density') {
      set(options, 'children', options.children.filter((item) => item.type === 'density'));
    }
    // 底层不消费violinType字段。
    set(options, 'violinType', undefined);
    return params;
  }

  return flow(init, customTransform, transformOptions, mark)(params);
}
