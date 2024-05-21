// TODO : Find a better way to do this
export const isCurrentRouteActive = (slug: string, pathname: string) => {
  const split = pathname.split('/');
  return split.includes(slug);
};
