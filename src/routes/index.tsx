import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

// components
import PrivateRoute from './PrivateRoute';
import Root from './Root';

// lazy load all the views

// auth
const Login = React.lazy(() => import('../pages/auth/Login'));
const Logout = React.lazy(() => import('../pages/auth/Logout'));
const ForgetPassword = React.lazy(() => import('../pages/auth/ForgetPassword'));
const ChangePassword = React.lazy(() => import('../pages/auth/ChangePassword'));

// dashboard
const Dashboard1 = React.lazy(() => import('../pages/dashboard/Dashboard1/'));

//profile

const Profile = React.lazy(() => import('../pages/user/UserInfo'));
const Settings = React.lazy(() => import('../pages/user/UserSettings'));
// - email
const Inbox = React.lazy(() => import('../pages/apps/Email/Inbox'));
const EmailDetail = React.lazy(() => import('../pages/apps/Email/Detail'));
const EmailCompose = React.lazy(() => import('../pages/apps/Email/Compose'));
// - tasks
const TaskList = React.lazy(() => import('../pages/apps/Tasks/List/'));
const TaskDetails = React.lazy(() => import('../pages/apps/Tasks/Details'));
const Kanban = React.lazy(() => import('../pages/apps/Tasks/Board/'));

const Error404 = React.lazy(() => import('../pages/error/Error404'));
const Error500 = React.lazy(() => import('../pages/error/Error500'));
// - other
const Upcoming = React.lazy(() => import('../pages/other/Upcoming'));
const Maintenance = React.lazy(() => import('../pages/other/Maintenance'));

// uikit
const Buttons = React.lazy(() => import('../pages/uikit/Buttons'));
const Avatars = React.lazy(() => import('../pages/uikit/Avatars'));
const Cards = React.lazy(() => import('../pages/uikit/Cards'));
const Portlets = React.lazy(() => import('../pages/uikit/Portlets'));
const TabsAccordions = React.lazy(
  () => import('../pages/uikit/TabsAccordions')
);
const Progress = React.lazy(() => import('../pages/uikit/Progress'));
const Modals = React.lazy(() => import('../pages/uikit/Modals'));
const Notifications = React.lazy(() => import('../pages/uikit/Notifications'));
const Offcanvases = React.lazy(() => import('../pages/uikit/Offcanvas'));
const Placeholders = React.lazy(() => import('../pages/uikit/Placeholders'));
const Spinners = React.lazy(() => import('../pages/uikit/Spinners'));
const Images = React.lazy(() => import('../pages/uikit/Images'));
const Carousels = React.lazy(() => import('../pages/uikit/Carousel'));
const ListGroups = React.lazy(() => import('../pages/uikit/ListGroups'));
const EmbedVideo = React.lazy(() => import('../pages/uikit/EmbedVideo'));
const Dropdowns = React.lazy(() => import('../pages/uikit/Dropdowns'));
const Ribbons = React.lazy(() => import('../pages/uikit/Ribbons'));
const TooltipsPopovers = React.lazy(
  () => import('../pages/uikit/TooltipsPopovers')
);
const GeneralUI = React.lazy(() => import('../pages/uikit/GeneralUI'));
const Typography = React.lazy(() => import('../pages/uikit/Typography'));
const Grid = React.lazy(() => import('../pages/uikit/Grid'));
const NestableList = React.lazy(() => import('../pages/uikit/NestableList'));
const DragDrop = React.lazy(() => import('../pages/uikit/DragDrop'));
const RangeSliders = React.lazy(() => import('../pages/uikit/RangeSliders'));
const Animation = React.lazy(() => import('../pages/uikit/Animation'));
const TourPage = React.lazy(() => import('../pages/uikit/TourPage'));
const SweetAlerts = React.lazy(() => import('../pages/uikit/SweetAlerts'));
const LoadingButtons = React.lazy(
  () => import('../pages/uikit/LoadingButtons')
);

// widgets
const Widgets = React.lazy(() => import('../pages/uikit/Widgets'));

// icons
const TwoToneIcons = React.lazy(() => import('../pages/icons/TwoToneIcons/'));
const FeatherIcons = React.lazy(() => import('../pages/icons/FeatherIcons/'));
const Dripicons = React.lazy(() => import('../pages/icons/Dripicons/'));
const MDIIcons = React.lazy(() => import('../pages/icons/MDIIcons/'));
const FontAwesomeIcons = React.lazy(
  () => import('../pages/icons/FontAwesomeIcons/')
);
const ThemifyIcons = React.lazy(() => import('../pages/icons/ThemifyIcons/'));
const SimpleLineIcons = React.lazy(
  () => import('../pages/icons/SimpleLineIcons/')
);
const WeatherIcons = React.lazy(() => import('../pages/icons/WeatherIcons/'));

// forms
const BasicForms = React.lazy(() => import('../pages/forms/Basic'));
const FormAdvanced = React.lazy(() => import('../pages/forms/Advanced'));
const FormValidation = React.lazy(() => import('../pages/forms/Validation'));
const FormWizard = React.lazy(() => import('../pages/forms/Wizard'));
const FileUpload = React.lazy(() => import('../pages/forms/FileUpload'));
const Editors = React.lazy(() => import('../pages/forms/Editors'));

// tables
const BasicTables = React.lazy(() => import('../pages/tables/Basic'));
const AdvancedTables = React.lazy(() => import('../pages/tables/Advanced'));

// charts
const ApexChart = React.lazy(() => import('../pages/charts/Apex'));
const ChartJs = React.lazy(() => import('../pages/charts/ChartJs'));

// maps
const GoogleMaps = React.lazy(() => import('../pages/maps/GoogleMaps'));
const VectorMaps = React.lazy(() => import('../pages/maps/VectorMaps'));

export interface RoutesProps {
  path: RouteProps['path'];
  name?: string;
  component?: RouteProps['component'];
  route?: any;
  exact?: RouteProps['exact'];
  icon?: string;
  header?: string;
  roles?: string[];
  children?: RoutesProps[];
}

// root routes
const rootRoute: RoutesProps = {
  path: '/',
  exact: true,
  component: () => <Root />,
  route: Route,
};

// dashboards
const dashboardRoutes: RoutesProps = {
  path: '/dashboard',
  name: 'Dashboard',
  icon: 'airplay',
  header: 'Navigation',
  component: Dashboard1,
  route: PrivateRoute,
};

const emailAppRoutes = [
  {
    path: '/requests',
    name: 'Requests',
    route: PrivateRoute,
    roles: ['admin'],
    icon: 'mail',
    component: Inbox,
  },
  {
    path: '/requests/details',
    name: 'Email Details',
    route: PrivateRoute,
    roles: ['admin'],
    component: EmailDetail,
  },
  {
    path: '/requests/compose',
    name: 'Compose Email',
    route: PrivateRoute,
    roles: ['admin'],
    component: EmailCompose,
  },
];

const dealAppRoutes = {
  path: '/deals',
  name: 'Deals',
  component: Kanban,
  roles: ['admin'],
  route: PrivateRoute,
};

const taskAppRoutes = [
  {
    path: '/tasks',
    name: 'Tasks',
    route: PrivateRoute,
    roles: ['admin'],
    icon: 'clipboard',
    component: TaskList,
  },
  {
    path: '/tasks/details',
    name: 'Task List',
    route: PrivateRoute,
    roles: ['admin'],
    component: TaskDetails,
  },
];

//profile

const profileAppRoutes = [
  {
    path: '/my-account',
    name: 'My Account',
    roles: ['admin'],
    component: Profile,
    exact: true,
    route: PrivateRoute,
  },
  {
    path: '/settings',
    name: 'Settings',
    roles: ['admin'],
    component: Settings,
    exact: true,
    route: PrivateRoute,
  },
];

const appRoutes = [
  ...emailAppRoutes,
  dealAppRoutes,
  ...taskAppRoutes,
  ...profileAppRoutes,
];

// pages
// const extrapagesRoutes = {
//   path: '/pages',
//   name: 'Pages',
//   icon: 'package',
//   header: 'Custom',
//   children: [
//     {
//       path: '/pages/starter',
//       name: 'Starter',
//       component: Starter,
//       route: PrivateRoute,
//     },
//     {
//       path: '/pages/timeline',
//       name: 'Timeline',
//       component: Timeline,
//       route: PrivateRoute,
//     },
//     {
//       path: '/pages/sitemap',
//       name: 'Sitemap',
//       component: Sitemap,
//       route: PrivateRoute,
//     },
//     {
//       path: '/pages/invoice',
//       name: 'Invoice',
//       component: Invoice,
//       route: PrivateRoute,
//     },
//     {
//       path: '/pages/faq',
//       name: 'FAQ',
//       component: FAQ,
//       route: PrivateRoute,
//     },
//     {
//       path: '/pages/serach-results',
//       name: 'Search Results',
//       component: SearchResults,
//       route: PrivateRoute,
//     },
//     {
//       path: '/pages/pricing',
//       name: 'Pricing',
//       component: Pricing,
//       route: PrivateRoute,
//     },
//     {
//       path: '/pages/gallery',
//       name: 'Gallery',
//       component: Gallery,
//       route: PrivateRoute,
//     },
//     {
//       path: '/pages/error-404-alt',
//       name: 'Error - 404-alt',
//       component: Error404Alt,
//       route: PrivateRoute,
//     },
//   ],
// };

// ui
const uiRoutes = {
  path: '/ui',
  name: 'Components',
  icon: 'pocket',
  header: 'UI Elements',
  children: [
    {
      path: '/ui/base',
      name: 'Base UI',
      children: [
        {
          path: '/ui/buttons',
          name: 'Buttons',
          component: Buttons,
          route: PrivateRoute,
        },
        {
          path: '/ui/cards',
          name: 'Cards',
          component: Cards,
          route: PrivateRoute,
        },
        {
          path: '/ui/avatars',
          name: 'Avatars',
          component: Avatars,
          route: PrivateRoute,
        },
        {
          path: '/ui/portlets',
          name: 'Portlets',
          component: Portlets,
          route: PrivateRoute,
        },
        {
          path: '/ui/tabs-accordions',
          name: 'Tabs & Accordions',
          component: TabsAccordions,
          route: PrivateRoute,
        },
        {
          path: '/ui/progress',
          name: 'Progress',
          component: Progress,
          route: PrivateRoute,
        },
        {
          path: '/ui/modals',
          name: 'Modals',
          component: Modals,
          route: PrivateRoute,
        },
        {
          path: '/ui/notifications',
          name: 'Notifications',
          component: Notifications,
          route: PrivateRoute,
        },
        {
          path: '/ui/offcanvas',
          name: 'Offcanvas',
          component: Offcanvases,
          route: PrivateRoute,
        },
        {
          path: '/ui/placeholders',
          name: 'Placeholders',
          component: Placeholders,
          route: PrivateRoute,
        },
        {
          path: '/ui/spinners',
          name: 'Spinners',
          component: Spinners,
          route: PrivateRoute,
        },
        {
          path: '/ui/images',
          name: 'Images',
          component: Images,
          route: PrivateRoute,
        },
        {
          path: '/ui/carousel',
          name: 'Carousel',
          component: Carousels,
          route: PrivateRoute,
        },
        {
          path: '/ui/listgroups',
          name: 'List Groups',
          component: ListGroups,
          route: PrivateRoute,
        },
        {
          path: '/ui/embedvideo',
          name: 'EmbedVideo',
          component: EmbedVideo,
          route: PrivateRoute,
        },
        {
          path: '/ui/dropdowns',
          name: 'Dropdowns',
          component: Dropdowns,
          route: PrivateRoute,
        },
        {
          path: '/ui/ribbons',
          name: 'Ribbons',
          component: Ribbons,
          route: PrivateRoute,
        },
        {
          path: '/ui/tooltips-popovers',
          name: 'Tooltips & Popovers',
          component: TooltipsPopovers,
          route: PrivateRoute,
        },
        {
          path: '/ui/typography',
          name: 'Typography',
          component: Typography,
          route: PrivateRoute,
        },
        {
          path: '/ui/grid',
          name: 'Grid',
          component: Grid,
          route: PrivateRoute,
        },
        {
          path: '/ui/general',
          name: 'General UI',
          component: GeneralUI,
          route: PrivateRoute,
        },
      ],
    },
    {
      path: '/ui/extended',
      name: 'Extended UI',
      children: [
        {
          path: '/extended-ui/nestable',
          name: 'Nestable List',
          component: NestableList,
          route: PrivateRoute,
        },
        {
          path: '/extended-ui/dragdrop',
          name: 'Drag and Drop',
          component: DragDrop,
          route: PrivateRoute,
        },
        {
          path: '/extended-ui/rangesliders',
          name: 'Range Sliders',
          component: RangeSliders,
          route: PrivateRoute,
        },
        {
          path: '/extended-ui/animation',
          name: 'Animation',
          component: Animation,
          route: PrivateRoute,
        },
        {
          path: '/extended-ui/sweet-alert',
          name: 'Sweet Alert',
          component: SweetAlerts,
          route: PrivateRoute,
        },
        {
          path: '/extended-ui/tour',
          name: 'Tour Page',
          component: TourPage,
          route: PrivateRoute,
        },
        {
          path: '/extended-ui/loading-buttons',
          name: 'Loading Buttons',
          component: LoadingButtons,
          route: PrivateRoute,
        },
      ],
    },
    {
      path: '/ui/widgets',
      name: 'Widgets',
      component: Widgets,
      route: PrivateRoute,
    },
    {
      path: '/ui/icons',
      name: 'Icons',
      children: [
        {
          path: '/ui/icons/two-tone',
          name: 'Two Tone Icons',
          component: TwoToneIcons,
          route: PrivateRoute,
        },
        {
          path: '/ui/icons/feather',
          name: 'Feather Icons',
          component: FeatherIcons,
          route: PrivateRoute,
        },
        {
          path: '/ui/icons/dripicons',
          name: 'Dripicons',
          component: Dripicons,
          route: PrivateRoute,
        },
        {
          path: '/ui/icons/mdi',
          name: 'Material Design',
          component: MDIIcons,
          route: PrivateRoute,
        },
        {
          path: '/ui/icons/font-awesome',
          name: 'Font Awesome 5',
          component: FontAwesomeIcons,
          route: PrivateRoute,
        },
        {
          path: '/ui/icons/themify',
          name: 'Themify',
          component: ThemifyIcons,
          route: PrivateRoute,
        },
        {
          path: '/ui/icons/simple-line',
          name: 'Simple Line Icons',
          component: SimpleLineIcons,
          route: PrivateRoute,
        },
        {
          path: '/ui/icons/weather',
          name: 'Weather Icons',
          component: WeatherIcons,
          route: PrivateRoute,
        },
      ],
    },
    {
      path: '/ui/forms',
      name: 'Forms',
      children: [
        {
          path: '/ui/forms/basic',
          name: 'Basic Elements',
          component: BasicForms,
          route: PrivateRoute,
        },
        {
          path: '/ui/forms/advanced',
          name: 'Form Advanced',
          component: FormAdvanced,
          route: PrivateRoute,
        },
        {
          path: '/ui/forms/validation',
          name: 'Form Validation',
          component: FormValidation,
          route: PrivateRoute,
        },
        {
          path: '/ui/forms/wizard',
          name: 'Form Wizard',
          component: FormWizard,
          route: PrivateRoute,
        },
        {
          path: '/ui/forms/upload',
          name: 'File Upload',
          component: FileUpload,
          route: PrivateRoute,
        },
        {
          path: '/ui/forms/editors',
          name: 'Editors',
          component: Editors,
          route: PrivateRoute,
        },
      ],
    },
    {
      path: '/ui/tables',
      name: 'Tables',
      children: [
        {
          path: '/ui/tables/basic',
          name: 'Basic',
          component: BasicTables,
          route: PrivateRoute,
        },
        {
          path: '/ui/tables/advanced',
          name: 'Advanced',
          component: AdvancedTables,
          route: PrivateRoute,
        },
      ],
    },
    {
      path: '/ui/charts',
      name: 'Charts',
      children: [
        {
          path: '/ui/charts/apex',
          name: 'Apex',
          component: ApexChart,
          route: PrivateRoute,
        },
        {
          path: '/ui/charts/chartjs',
          name: 'Chartjs',
          component: ChartJs,
          route: PrivateRoute,
        },
      ],
    },
    {
      path: '/ui/maps',
      name: 'Maps',
      children: [
        {
          path: '/ui/googlemaps',
          name: 'Google Maps',
          component: GoogleMaps,
          route: PrivateRoute,
        },
        {
          path: '/ui/vectorMaps',
          name: 'Google Maps',
          component: VectorMaps,
          route: PrivateRoute,
        },
      ],
    },
  ],
};

// auth
const authRoutes: RoutesProps[] = [
  {
    path: '/auth/login',
    name: 'Login',
    component: Login,
    exact: true,
    route: Route,
  },
  {
    path: '/auth/forget-password',
    name: 'Forget Password',
    component: ForgetPassword,
    exact: true,
    route: Route,
  },
  {
    path: '/auth/change-password',
    name: 'Change Password',
    component: ChangePassword,
    exact: true,
    route: Route,
  },
  {
    path: '/auth/logout',
    name: 'Logout',
    component: Logout,
    exact: true,
    route: Route,
  },
];

// public routes
const otherPublicRoutes = [
  {
    path: '/maintenance',
    name: 'Maintenance',
    component: Maintenance,
    exact: true,
    route: Route,
  },
  {
    path: '/error-404',
    name: 'Error - 404',
    component: Error404,
    exact: true,
    route: Route,
  },
  {
    path: '/error-500',
    name: 'Error - 500',
    component: Error500,
    exact: true,
    route: Route,
  },
  {
    path: '/upcoming',
    name: 'Coming Soon',
    component: Upcoming,
    exact: true,
    route: Route,
  },
];

// flatten the list of all nested routes
const flattenRoutes = (routes: RoutesProps[]) => {
  let flatRoutes: RoutesProps[] = [];

  routes = routes || [];
  routes.forEach((item: RoutesProps) => {
    flatRoutes.push(item);

    if (typeof item.children !== 'undefined') {
      flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
    }
  });
  return flatRoutes;
};

// All routes
const authProtectedRoutes = [
  rootRoute,
  dashboardRoutes,
  ...appRoutes,
  uiRoutes,
];
const publicRoutes = [...authRoutes, ...otherPublicRoutes];

const authProtectedFlattenRoutes = flattenRoutes([...authProtectedRoutes]);
const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes]);
export {
  publicRoutes,
  authProtectedRoutes,
  authProtectedFlattenRoutes,
  publicProtectedFlattenRoutes,
};
