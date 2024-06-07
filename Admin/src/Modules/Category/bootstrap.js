import intlMessagesEN from "./i18n/localization/en.json";
import intlMessagesVi from "./i18n/localization/vi.json";
// import initReducer from "./Store/initReducer";
// import initSagas from "./Store/initSagas";

export default {
  name: "Category",
  dir: "Category",
  pathRoot: "manage-categories",
  routes: [
    {
      url: "",
      component: "Page/index",
      layout: "BlankLayout",
      meta: {
        authRoute: true,
      },
      props: {
        title: "Manage Category",
        titleI18n: "Manage Category",
        exact: true,
      },
    },
    {
      url: "create-category",
      component: "Page/CreateCategory",
      layout: "BlankLayout",
      meta: {
        authRoute: true,
      },
      props: {
        title: "Create Category",
        titleI18n: "Create Category",
        exact: true,
      },
    },
    {
      url: "update-category",
      component: "Page/CreateCategory",
      layout: "BlankLayout",
      meta: {
        authRoute: true,
      },
      props: {
        title: "Update Category",
        titleI18n: "Update Category",
        exact: true,
      },
    },
  ],
  lang: { vi: intlMessagesVi, en: intlMessagesEN },
  isAuthenticate: true,
  // redux: initReducer,
  // sagas: initSagas,
};
