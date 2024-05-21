import {
  IDLE,
  PENDING,
  REJECTED,
  RESOLVED,
  LOADING,
} from "@/core/constants/states";

export type LoadingStates =
  | typeof IDLE
  | typeof PENDING
  | typeof RESOLVED
  | typeof REJECTED
  | typeof LOADING;
