import intlMessagesEN from "./i18n/localization/en.json";
import intlMessagesVi from "./i18n/localization/vi.json";
// import initReducer from "./Store/initReducer";
// import initSagas from "./Store/initSagas";

export default {
  name: "Promotion",
  dir: "Promotion",
  pathRoot: "manage-promotion",
  routes: [
    {
      url: "",
      component: "Page/index",
      layout: "BlankLayout",
      meta: {
        authRoute: true,
      },
      props: {
        title: "Manage Promotion",
        titleI18n: "Manage Promotion",
        exact: true,
      },
    },
    {
      url: "create-promotion",
      component: "Page/CreateCategory",
      layout: "BlankLayout",
      meta: {
        authRoute: true,
      },
      props: {
        title: "Create Promotion",
        titleI18n: "Create Promotion",
        exact: true,
      },
    },
    {
      url: "update-promotion",
      component: "Page/CreateCategory",
      layout: "BlankLayout",
      meta: {
        authRoute: true,
      },
      props: {
        title: "Update Promotion",
        titleI18n: "Update Promotion",
        exact: true,
      },
    },
  ],
  lang: { vi: intlMessagesVi, en: intlMessagesEN },
  isAuthenticate: true,
  // redux: initReducer,
  // sagas: initSagas,
};
