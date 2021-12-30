import { createMachine, interpret } from 'xstate'
import type { MachineConfig } from 'xstate'

export const ERROR = 'ERROR'
export const GO_NEXT = 'GO_NEXT'
export const GO_PREVIOUS = 'GO_PREVIOUS'

type NavigationEvent =
  | { type: typeof ERROR }
  | { type: typeof GO_NEXT }
  | { type: typeof GO_PREVIOUS }

interface NavigationContext {}

const formSubmissionStates: MachineConfig<
  NavigationContext,
  any,
  NavigationEvent
> = {
  key: 'step',
  initial: 'beschrijf',
  states: {
    wonen: {
      on: {
        [GO_NEXT]: { target: 'vulaan' },
      },
    },
    vulaan: {
      on: {
        [GO_NEXT]: { target: 'contact' },
        [GO_PREVIOUS]: { target: 'beschrijf' },
      },
    },
    contact: {
      on: {
        [GO_NEXT]: { target: 'versturen' },
        [GO_PREVIOUS]: { target: 'vulaan' },
      },
    },
    versturen: {
      on: {
        [ERROR]: { target: 'fout' },
        [GO_NEXT]: { target: 'bedankt' },
        [GO_PREVIOUS]: { target: 'contact' },
      },
    },
    bedankt: { type: 'final' },
    fout: { type: 'final' },
  },
}

const machine = createMachine(formSubmissionStates)
const formSubmissionService = interpret(machine).start()

export { machine, formSubmissionService }
