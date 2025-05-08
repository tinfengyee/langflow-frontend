import { useGetConfig } from "@/controllers/API/queries/config/use-get-config";
import { useGetBasicExamplesQuery } from "@/controllers/API/queries/flows/use-get-basic-examples";
import { useGetTypes } from "@/controllers/API/queries/flows/use-get-types";
import { CustomLoadingPage } from "@/customization/components/custom-loading-page";
import { useCustomPrimaryLoading } from "@/customization/hooks/use-custom-primary-loading";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { LoadingPage } from "../LoadingPage";

// 简化版的 AppInitPage，移除所有身份验证相关代码
export function AppInitPage() {
  // 加载必要的数据
  const { isFetched: isLoaded } = useCustomPrimaryLoading();
  const { isFetched: isConfigFetched } = useGetConfig({ enabled: true });
  const { data: types } = useGetTypes({ enabled: true });
  const { isFetched: isExamplesFetched } = useGetBasicExamplesQuery();

  return (
    <>
      {isLoaded ? (
        (!isConfigFetched || !isExamplesFetched || !types) && <LoadingPage overlay />
      ) : (
        <CustomLoadingPage />
      )}
      {isConfigFetched && isExamplesFetched && types && <Outlet />}
    </>
  );
}
