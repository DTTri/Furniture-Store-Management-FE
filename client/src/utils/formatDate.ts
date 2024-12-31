const formatDate = (currentFormat: string) => {
  // from yyyy-mm-dd to mm-dd-yyyy
  const date = currentFormat.split("-");
  return `${date[1]}-${date[2]}-${date[0]}`;
};
export default formatDate;
