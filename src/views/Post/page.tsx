import AppWrapper from "@/appWrapper";
import ViewPost from "./ui/ViewPost";

const ViewPostWrapper: typeof ViewPost = (props) => {
  return (
    <AppWrapper>
      <ViewPost {...props} />
    </AppWrapper>
  );
};

export default ViewPostWrapper;
