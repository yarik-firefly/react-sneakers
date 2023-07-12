import React from "react";
import ContentLoader from "react-content-loader";

const MySkeleton = () => (
  <ContentLoader
    speed={2}
    width={250}
    height={250}
    viewBox="0 0 250 250"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="138" cy="150" r="3" />
    <rect x="12" y="16" rx="26" ry="26" width="150" height="112" />
    <rect x="12" y="143" rx="10" ry="10" width="150" height="30" />
    <rect x="10" y="189" rx="10" ry="10" width="85" height="36" />
    <rect x="105" y="189" rx="10" ry="10" width="59" height="36" />
  </ContentLoader>
);

export default MySkeleton;
