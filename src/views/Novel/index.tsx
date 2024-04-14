import AppWrapper from "@/appWrapper"
import Novel from "./ui/Novel"

const NovelPage: typeof Novel = (props) => {
  return (
    <AppWrapper>
      <Novel {...props} />
    </AppWrapper>
  );
};

export default NovelPage;
