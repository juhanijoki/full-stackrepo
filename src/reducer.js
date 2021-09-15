const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  console.log(state)
  switch (action.type) {
    case 'GOOD':
      const newGood = state.good + 1
      const updatedState = {
        good: newGood,
        ok: state.ok,
        bad: state.bad
      }
      return updatedState
    case 'OK':
      const newOk = state.ok + 1
      const updatedOkState = {
        good: state.good,
        ok: newOk,
        bad: state.bad
      }
      return updatedOkState
    case 'BAD':
      const newBad = state.bad + 1
      const updatedBadState = {
        good: state.good,
        ok: state.ok,
        bad: newBad
      }
      return updatedBadState
    case 'ZERO':
      const zeroState = {
        good: 0,
        ok: 0,
        bad: 0
      }
      return zeroState
    default: return state
  }
}

export default counterReducer