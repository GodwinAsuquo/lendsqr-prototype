import Users from "@/pages/app/users";
import {
  Dashboard,
  Guarantors,
  Loans,
  Savings,
  LoanRequests,
  Whitelist,
  Karma,
  Organization,
  LoanProducts,
  SavingsProducts,
  FeesAndCharges,
  DecisionModels,
  Transactions,
  Services,
  ServiceAccount,
  Settlements,
  Reports,
  Preferences,
  FeesAndPricing,
  AuditLogs,
  SystemsMessages
} from "@/pages/app/placeholderPages";

import { Signin } from "@/pages/auth";
import { PRIVATE_PATHS, PUBLIC_PATHS } from "@/utils/constants";
import { Navigate } from "react-router-dom";
import UserDetails from "@/pages/app/users/userDetails";

interface AppRoute {
  path: string;
  element: React.ReactNode;
  children?: AppRoute[];
}

const { ROOT, SIGNIN } = PUBLIC_PATHS;
const {
  DASHBOARD,
  USERS,
  USER_DETAILS,
  GUARANTORS,
  LOANS,
  DECISION_MODELS,
  SAVINGS,
  LOAN_REQUESTS,
  WHITELIST,
  KARMA,
  ORGANIZATION,
  LOAN_PRODUCTS,
  SAVINGS_PRODUCTS,
  FEES_AND_CHARGES,
  TRANSACTIONS,
  SERVICES,
  SERVICE_ACCOUNT,
  SETTLEMENTS,
  REPORTS,
  PREFERENCES,
  FEES_AND_PRICING,
  AUDIT_LOGS,
  SYSTEM_MESSAGES
} = PRIVATE_PATHS;

export const PUBLIC_ROUTES: AppRoute[] = [
  {
    path: ROOT,
    element: <Signin />,
  },
  {
    path: SIGNIN,
    element: <Signin />,
  },
  {
    path: "*",
    element: <Navigate to={ROOT} replace />,
  },
];

export const PRIVATE_ROUTES: AppRoute[] = [
  // Dashboard
  {
    path: DASHBOARD,
    element: <Dashboard />,
  },

  // ========== CUSTOMERS SECTION ==========
  {
    path: USERS,
    element: <Users />,
  },
  {
    path: USER_DETAILS,
    element: <UserDetails />,
  },
  {
    path: GUARANTORS,
    element: <Guarantors />,
  },
  {
    path: LOANS,
    element: <Loans />,
  },
  {
    path: DECISION_MODELS,
    element: <DecisionModels />,
  },
  {
    path: SAVINGS,
    element: <Savings />,
  },
  {
    path: LOAN_REQUESTS,
    element: <LoanRequests />,
  },
  {
    path: WHITELIST,
    element: <Whitelist />,
  },
  {
    path: KARMA,
    element: <Karma />,
  },

  // ========== BUSINESSES SECTION ==========
  {
    path: ORGANIZATION,
    element: <Organization />,
  },
  {
    path: LOAN_PRODUCTS,
    element: <LoanProducts />,
  },
  {
    path: SAVINGS_PRODUCTS,
    element: <SavingsProducts />,
  },
  {
    path: FEES_AND_CHARGES,
    element: <FeesAndCharges />,
  },
  {
    path: TRANSACTIONS,
    element: <Transactions />,
  },
  {
    path: SERVICES,
    element: <Services />,
  },
  {
    path: SERVICE_ACCOUNT,
    element: <ServiceAccount />,
  },
  {
    path: SETTLEMENTS,
    element: <Settlements />,
  },
  {
    path: REPORTS,
    element: <Reports />,
  },

  // ========== SETTINGS SECTION ==========
  {
    path: PREFERENCES,
    element: <Preferences />,
  },
  {
    path: FEES_AND_PRICING,
    element: <FeesAndPricing />,
  },
  {
    path: AUDIT_LOGS,
    element: <AuditLogs />,
  },
  {
    path: SYSTEM_MESSAGES,
    element: <SystemsMessages />,
  },
  {
    path: "*",
    element: <Navigate to={USERS} replace />,
  },
];
