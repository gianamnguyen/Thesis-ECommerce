import intlMessagesEN from "./i18n/localization/en.json";
import intlMessagesVi from "./i18n/localization/vi.json";
// import initReducer from "./Store/initReducer";
// import initSagas from "./Store/initSagas";

export default {
  name: "Attribute",
  dir: "Attribute",
  pathRoot: "manage-attribute",
  routes: [
    {
      url: "",
      component: "Page/index",
      layout: "BlankLayout",
      meta: {
        authRoute: true,
      },
      props: {
        title: "Manage Attribute",
        titleI18n: "Manage Attribute",
        exact: true,
      },
    },
    {
      url: "create-attribute",
      component: "Page/CreateAttribute",
      layout: "BlankLayout",
      meta: {
        authRoute: true,
      },
      props: {
        title: "Create Attribute",
        titleI18n: "Create CaAttributetegory",
        exact: true,
      },
    },
    {
      url: "update-attribute",
      component: "Page/CreateAttribute",
      layout: "BlankLayout",
      meta: {
        authRoute: true,
      },
      props: {
        title: "Update Attribute",
        titleI18n: "Update Attribute",
        exact: true,
      },
    },
  ],
  lang: { vi: intlMessagesVi, en: intlMessagesEN },
  isAuthenticate: true,
  // redux: initReducer,
  // sagas: initSagas,
};
