import { put, takeLatest } from "redux-saga/effects"

import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

import { getSteps } from "@/sdk"
import { Step } from "@/types"

interface IState {
  ready: boolean
  curStep: number
  lastStep: number
  steps: Step[]
}

const initialState: IState = {
  ready: false,
  curStep: -1,
  lastStep: 0,
  steps: [],
}

const slice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setReady(state, action: PayloadAction<boolean>) {
      state.ready = action.payload
    },
    getInitialData(state) {
      state.ready = false
    },
    setInitialData(state, action: PayloadAction<Step[]>) {
      state.steps = action.payload
      state.lastStep = action.payload[action.payload.length - 1].uid
    },
    setStep(state, action: PayloadAction<number>) {
      const nextStep = action.payload
      const lastStep = state.steps[state.steps.length - 1].uid
      if (nextStep >= -1 && nextStep <= lastStep) {
        state.curStep = nextStep
      }
      state.lastStep = lastStep
      console.log("last step", lastStep)
    },
  },
})

export const { setReady, getInitialData, setStep } = slice.actions
export default slice.reducer

function* handleSaga(): any {
  const data = yield getSteps()
  yield put(slice.actions.setInitialData(data))
}

export function* saga() {
  yield takeLatest("global/getInitialData", handleSaga)
}
