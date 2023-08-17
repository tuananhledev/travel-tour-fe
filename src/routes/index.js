import { Home, About, Tours, Login, Register, NotFound, Search, ToursDetail, CartTours, CrudAdmin, EditTourForm, CreateTourForm } from "../pages";

const routes = [
   {
      path: "/",
      element: Home,
   },
   {
      path: "/about",
      element: About,
   },
   {
      path: "/tours",
      element: Tours,
   },
   {
      path: "/tours/search",
      element: Search,
   },
   {
      path: "/tours/:tourId",
      element: ToursDetail,
   },
   {
      path: "/login",
      element: Login,
   },
   {
      path: "/register",
      element: Register,
   },
   {
      path: "/cart-tour",
      element: CartTours,
   },
   {
      path: "/crud-admin",
      element: CrudAdmin,
   },
   {
      path: "/edit-tour/:tourId",
      element: EditTourForm,
   },
   {
      path: "/create-tour",
      element: CreateTourForm,
   },
   {
      path: "*",
      element: NotFound,
   },
];

export default routes;
