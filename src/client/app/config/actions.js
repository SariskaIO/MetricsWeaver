import Actions from './actions-types';

export const setConfig = (config) => ({
  type: Actions.SetConfig,
  payload: config,
});

export const fetchConfig = () => {
  return async (dispatch) => {
    try {
      // Get the token from local storage
      const token = localStorage.getItem('token');

      const response = await fetch('/meet-external/rtc-visualizer/config', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Unable to fetch config data');
      }

      const config = await response.json();
      dispatch(setConfig(config));
    } catch (error) {
      console.error('Error fetching config:', error);
    }
  };
};