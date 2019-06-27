/* eslint-disable prettier/prettier */
import DashboardLayout from 'src/pages/Layouts/Dashboard/DashboardLayout.vue';
import AuthLayout from 'src/pages/Layouts/Auth/AuthLayout.vue';
// Frontend Layout
import FrontendLayout from 'src/pages/Layouts/Frontend/FrontendLayout.vue';
// GeneralViews
import NotFound from 'src/pages/Layouts/NotFound/NotFoundPage.vue';

//////////////////////////////////////////////////////////////////////
///////////////////////////// MY PAGES ///////////////////////////////

const Dashboard = () =>
  import(
    /* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Dashboard.vue'
  );

const Courses = () =>
  import(/* webpackChunkName: "extra" */ 'src/pages/Courses/Courses.vue');

const MyCourses = () =>
  import(/* webpackChunkName: "extra" */ 'src/pages/MyCourses/MyCourses.vue');

const SingleLesson = () =>
  import(
    /* webpackChunkName: "extra" */ 'src/pages/SingleLesson/SingleLesson.vue'
  );

const SingleLessonGuest = () =>
  import(
    /* webpackChunkName: "extra" */ 'src/pages/SingleLesson/SingleLessonGuest.vue'
  );

const VerificationPayments = () =>
  import(
    /* webpackChunkName: "extra" */ 'src/pages/Courses/VerificationPayments.vue'
  );

const SingleQuizLayout = () =>
  import(/* webpackChunkName: "extra" */ 'src/pages/Quiz/SingleQuizLayout.vue');

const QuizStartPage = () =>
  import(/* webpackChunkName: "extra" */ 'src/pages/Quiz/QuizStartPage.vue');

const GradeSheet = () =>
  import(/* webpackChunkName: "extra" */ 'src/pages/Quiz/GradeSheet.vue');

const Quizzes = () =>
  import(/* webpackChunkName: "extra" */ 'src/pages/Quiz/Quizzes.vue');

const Points = () =>
  import(/* webpackChunkName: "extra" */ 'src/pages/Points/Points.vue');

const CourseOverview = () =>
  import(
    /* webpackChunkName: "extra" */ 'src/pages/AdminSection/ManageCourses/CourseOverview.vue'
  );

const EpisodeOverview = () =>
  import(
    /* webpackChunkName: "extra" */ 'src/pages/AdminSection/ManageEpisodes/EpisodeOverview.vue'
  );

const SingleTicket = () =>
  import(/* webpackChunkName: "extra" */ 'src/pages/Tickets/SingleTicket.vue');

const TicketOverview = () =>
  import(
    /* webpackChunkName: "extra" */ 'src/pages/AdminSection/ManageTickets/TicketOverview.vue'
  );

const AllTickets = () =>
  import(/* webpackChunkName: "extra" */ 'src/pages/Tickets/AllTickets.vue');

const CreateTicket = () =>
  import(/* webpackChunkName: "extra" */ 'src/pages/Tickets/CreateTicket.vue');

const ManageUsers = () =>
  import(
    /* webpackChunkName: "extra" */ 'src/pages/AdminSection/ManageUsers/ManageUsers.vue'
  );

const BlogOverview = () =>
  import(
    /* webpackChunkName: "extra" */ 'src/pages/AdminSection/ManageBlogs/BlogOverview.vue'
  );

const QuizOverview = () =>
  import(
    /* webpackChunkName: "extra" */ 'src/pages/AdminSection/ManageQuizzes/QuizOverview.vue'
  );

//////////////////////////////////////////////////////////////////////
///////////////////////////// FRONTEND PAGES /////////////////////////

const Home = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/FrontendPages/Home.vue');

const PrivateClasses = () =>
  import(
    /* webpackChunkName: "pages" */ 'src/pages/FrontendPages/PrivateClasses.vue'
  );

const ComingSoon = () =>
  import(
    /* webpackChunkName: "pages" */ 'src/pages/FrontendPages/ComingSoon.vue'
  );

const Contact = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/FrontendPages/Contact.vue');

const BlogPageLayout = () =>
  import(
    /* webpackChunkName: "pages" */ 'src/pages/FrontendPages/Components/Blog/BlogPageLayout.vue'
  );

const Terms = () =>
  import(
    /* webpackChunkName: "pages" */ 'src/pages/FrontendPages/Components/Terms/Terms.vue'
  );

//////////////////////////////////////////////////////////////////////
//////////////////////////////// PAGES ///////////////////////////////

const Login = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/Login/Login.vue');

const Register = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/Register/Register.vue');

const ForgotPassword = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/Login/ForgotPassword.vue');

const ResetPassword = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/Login/ResetPassword.vue');

const Lock = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/Layouts/Lock/Lock.vue');

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

let frontendpages = {
  path: '/',
  component: FrontendLayout,
  name: 'Frontend',
  children: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/privateclasses',
      name: 'PrivateClasses',
      component: PrivateClasses
    },
    {
      path: '/comingsoon',
      name: 'ComingSoon',
      component: ComingSoon
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/terms',
      name: 'Terms',
      component: Terms
    },
    {
      path: '/blog/:slug',
      name: 'BlogPageLayout',
      component: BlogPageLayout
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/forgotpassword',
      name: 'Forgot Password',
      component: ForgotPassword
    },
    {
      path: '/auth/password/reset/:token',
      name: 'Reset Password',
      component: ResetPassword
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/lock',
      name: 'Lock',
      component: Lock
    }
  ]
};

const routes = [
  {
    path: '/home',
    redirect: '/'
  },
  frontendpages,
  // authPages,

  {
    path: '/',
    component: DashboardLayout,
    redirect: '/dashboard',
    name: 'Dashboard',
    meta: {
      auth: true
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        components: {
          default: Dashboard
        }
      },
      {
        path: 'courses',
        name: 'Courses',
        components: {
          default: Courses
        }
      },
      {
        path: 'mycourses',
        name: 'My Courses',
        components: {
          default: MyCourses
        }
      },
      {
        path: 'courses/payments/verification',
        name: 'Course Pay Verification',
        components: {
          default: VerificationPayments
        }
      },
      // {
      //   path: 'courses/:course/unit-:unit',
      //   name: 'Single Lesson',
      //   components: {
      //     default: SingleLesson
      //   }
      // },
      {
        path: 'singlequizlayout',
        name: 'Single Quiz',
        components: {
          default: SingleQuizLayout
        }
      },

      {
        path: 'quizstartpage',
        name: 'Quiz Start Page',
        components: {
          default: QuizStartPage
        }
      },

      {
        path: 'gradesheet',
        name: 'Grade Sheet',
        components: {
          default: GradeSheet
        }
      },
      {
        path: 'quizzes',
        name: 'Quizzes',
        components: {
          default: Quizzes
        }
      },
      {
        path: 'courseoverview',
        name: 'CourseOverview',
        components: {
          default: CourseOverview
        }
      },
      {
        path: 'episodeoverview',
        name: 'EpisodeOverview',
        components: {
          default: EpisodeOverview
        }
      },
      {
        path: 'manageusers',
        name: 'Manage Users',
        components: {
          default: ManageUsers
        }
      },
      {
        path: 'blogoverview',
        name: 'Blog Overview',
        components: {
          default: BlogOverview
        }
      },
      {
        path: 'singleticket',
        name: 'Single Ticket',
        components: {
          default: SingleTicket
        }
      },
      {
        path: 'ticketoverview',
        name: 'Ticket Overview',
        components: {
          default: TicketOverview
        }
      },
      {
        path: 'tickets',
        name: 'All Tickets',
        components: {
          default: AllTickets
        }
      },
      {
        path: 'createticket',
        name: 'Create Tickets',
        components: {
          default: CreateTicket
        }
      },
      {
        path: 'quizoverview',
        name: 'Quiz Overview',
        components: {
          default: QuizOverview
        }
      },
      {
        path: 'points',
        name: 'Points',
        components: {
          default: Points
        }
      }
    ]
  },
  {
    path: '/',
    component: FrontendLayout,
    children: [
      {
        path: 'courses/:slug',
        name: 'Single Course Guest',
        components: {
          default: SingleLessonGuest
        }
      },
      {
        path: 'courses/:course/unit-:unit',
        name: 'Single Lesson',
        components: {
          default: SingleLesson
        }
      }
    ]
  },
  {
    path: '/',
    component: AuthLayout,
    children: [
      {
        path: '*',
        components: {
          default: NotFound
        }
      }
    ]
  }
];

export default routes;
