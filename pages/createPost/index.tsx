import InsertPost from "@/components/InsertPost/InsertPost";
import PageTemplate from "@/components/PageTemplate/PageTemplate";

type Props = {};

const index = (props: Props) => {
  return (
    <PageTemplate>
      <InsertPost />
    </PageTemplate>
  );
};

export default index;
