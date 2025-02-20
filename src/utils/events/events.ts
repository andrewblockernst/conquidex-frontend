export const CLUB_VIEW_REFRESH_EVENT = 'club-view-refresh';

export const triggerClubViewRefresh = () => {
  window.dispatchEvent(new Event(CLUB_VIEW_REFRESH_EVENT));
};