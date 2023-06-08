import SiteLayout from "@/components/site/SiteLayout";
import React from "react";

const Page = () => {
  return <div>Home</div>;
};

Page.getLayout = (page) => <SiteLayout>{page}</SiteLayout>;

export default Page;
