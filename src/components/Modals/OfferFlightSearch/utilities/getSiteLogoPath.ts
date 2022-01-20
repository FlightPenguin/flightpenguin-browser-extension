export const getSiteLogoPath = (): string | undefined => {
  const ogTwitterLogo = document.querySelector("meta[name='twitter:image']") as HTMLMetaElement | undefined;
  if (ogTwitterLogo && ogTwitterLogo?.content) {
    return ogTwitterLogo.content;
  }

  const appleTouchLogo = document.querySelector("link[rel='apple-touch-icon']") as HTMLLinkElement | undefined;
  if (appleTouchLogo && appleTouchLogo?.href) {
    return appleTouchLogo.href;
  }

  return undefined;
};
