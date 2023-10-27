import { create as actualCreate, StateCreator } from "zustand";
import { act } from "react-dom/test-utils";

const storeResetFns = new Set<() => void>();

export const create = <S>(createState: StateCreator<S>) => {
  const store = actualCreate(createState);
  const initialState = store.getState();
  storeResetFns.add(() => store.setState(initialState, true));
  return store;
};

beforeEach(() => {
  act(() => storeResetFns.forEach((resetFn) => resetFn()));
});
