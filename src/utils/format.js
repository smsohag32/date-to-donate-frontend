export const formatBreadcrumb = (segment) => {
   return segment
      .replace(/[-_]/g, " ") // replace - and _ with space
      .split(" ") // split into words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
};
