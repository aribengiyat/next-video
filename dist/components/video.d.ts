import type { DefaultPlayerProps } from './players/default-player.js';
import type { Asset } from '../assets.js';
import type { VideoLoaderProps, VideoProps, VideoPropsInternal } from './types.js';
declare const NextVideo: any;
export declare function getVideoProps(allProps: VideoPropsInternal, state: {
    asset?: Asset;
}): DefaultPlayerProps;
export default NextVideo;
export type { VideoLoaderProps, VideoProps, DefaultPlayerProps, };
