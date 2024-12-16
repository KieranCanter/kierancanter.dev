/**
 * Analytics Type Definition
 * Defines structure for Umami analytics tracking
 */
type TrackEvent = {
  track: (eventName: string, eventData?: object) => void;
}
  
/**
 * Track Analytics Event
 * Safely calls Umami analytics tracking when available
 * @param eventName - Name of the event to track
 * @param eventData - Optional data to attach to event
 */
export const trackEvent = (eventName: string, eventData?: object) => {
  if (typeof window !== 'undefined' && (window as any).umami) {
    (window as any).umami.track(eventName, eventData);
  }
};