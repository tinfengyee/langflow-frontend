import { lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
} from "react-router-dom";
import ContextWrapper from "./contexts";
import { BASENAME } from "./customization/config-constants";
import FlowPage from "./pages/FlowPage";
import { DashboardWrapperPage } from "./pages/DashboardWrapperPage";

const PlaygroundPage = lazy(() => import("./pages/Playground"));

// 简化的路由配置，移除了所有身份验证
const router = createBrowserRouter(
  createRoutesFromElements([
    <Route
      path="/playground/:id/"
      element={
        <ContextWrapper key="playground">
          <PlaygroundPage />
        </ContextWrapper>
      }
    />,
    <Route
      path="/"
      element={
        <ContextWrapper key="main">
          <Outlet />
        </ContextWrapper>
      }
    >
      <Route path="" element={<DashboardWrapperPage />}>
        <Route index element={<FlowPage />} />
      </Route>
      <Route path="flow/:id/" element={<DashboardWrapperPage />}>
        <Route path="" element={<FlowPage />} />
      </Route>
    </Route>,
  ]),
  { basename: BASENAME || undefined },
);

export default router;
