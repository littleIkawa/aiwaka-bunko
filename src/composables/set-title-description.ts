export const setTitle = (pathTitle: string): void => {
  const siteTitle = "あいわか文庫";
  const pageTitle = !pathTitle ? siteTitle : `${pathTitle} | ${siteTitle}`;
  window.document.title = pageTitle;
};
export const setDescription = (pathDesc: string): void => {
  const defaultDescription = "This is initial description.";
  const description = pathDesc ? pathDesc : defaultDescription;
  document
    .querySelector("meta[name='description']")
    ?.setAttribute("content", description);
};

export default {
  setTitle,
  setDescription,
};
