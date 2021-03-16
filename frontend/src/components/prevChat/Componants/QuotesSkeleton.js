import Shimmer from "../../../Skeleton/Shimmer";
import SkeletonElement from "../../../Skeleton/SkeletonElement";
import "../../../Skeleton/Skeletons.css";

const QuotesSkeleton = () => {
  return (
    <div className="skeleton-wrapper">
      <SkeletonElement type="text" />
      <SkeletonElement type="text" />
      <SkeletonElement type="text" />
      <Shimmer />
    </div>
  );
};

export default QuotesSkeleton;
