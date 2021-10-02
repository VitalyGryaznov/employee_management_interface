import { DataActionType, UserType } from "../types";

interface IReducer {
  type: DataActionType;
  payload: any;
}

export const DataReducer: React.Reducer<Array<UserType>, IReducer> = (
  state,
  action
) => {
  switch (action.type) {
    case DataActionType.ADD_USER:
      return [...state, action.payload];
    case DataActionType.FETCH_USERS:
      return action.payload;
    case DataActionType.REMOVE_USER:
      return state.filter((user: UserType) => user.id !== action.payload);
    case DataActionType.UPDATE_USER:
      return [
        ...state.filter((user: UserType) => user.id !== action.payload.id),
        action.payload,
      ];
    default:
      return state;
  }
};
