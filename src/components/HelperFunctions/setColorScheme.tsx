import aoLightFavicon from '/images/ao-pictograph_light.svg?url';
import aoDarkFavicon from '/images/ao-pictograph_light.svg?url';

const favicon = document.getElementById('favicon') as HTMLLinkElement;

export const setColorScheme = (
  mediaQueryOrEvent: MediaQueryList | MediaQueryListEvent
) => {
  if (mediaQueryOrEvent.matches) {
    favicon.href = aoDarkFavicon;
    console.log('dark');
  } else {
    favicon.href = aoLightFavicon;
    console.log('light');
  }
};
