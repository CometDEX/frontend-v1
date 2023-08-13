import Skeleton from "@mui/material/Skeleton";

export default function InlineLoader(props) {
  return (
    <>
      <div className="headers">
        <div className="avatar">
          <Skeleton variant="circle" width="5rem" height="5rem" />
        </div>
        <div>
          <Skeleton width="8rem" />
          <Skeleton width="12rem" />
          <Skeleton width="6rem" />
        </div>
      </div>
      {/* <Skeleton variant="rect" height="5vh"/> */}
      <Skeleton />
      <Skeleton />
      <Skeleton width="90%" />
      <Skeleton />
      <Skeleton width="90%" />
      <Skeleton width="50%" />
      <Skeleton width="20%" />
      <style jsx>{`
        .headers {
          display: flex;
          margin-bottom: 0.5rem;
          align-items: center;
        }
        .avatar {
          margin-right: 1rem;
        }
      `}</style>
    </>
  );
}
