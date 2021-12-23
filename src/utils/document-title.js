const setDocumentTitle = (title) => {
  const defaultTitle = document.title;

  if (title && title !== defaultTitle) {
    document.title = `Would you rather | ${title}`;
  }
};

export default setDocumentTitle;
