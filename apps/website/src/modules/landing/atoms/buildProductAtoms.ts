import { Option, Product } from '@smartfood/client/v2';
import { OptionSelection } from '@smartfood/common';
import { atom } from 'jotai';
import { atomFamily, splitAtom } from 'jotai/utils';

// I know, this is strange, but it's the only way not to deal with null verification.
// psdt: the dada will never be null
export const currentProductAtom = atom<Product>({} as any as Product);

/**
 * This is a convenient format for rendering the steps
 */
export const selectionAtom = atom<Record<number, Option>>((get) => {
  const product = get(currentProductAtom);
  const options = product.options;
  const selection = (options ?? []).reduce((acc, curr, idx) => {
    return {
      ...acc,
      [idx]: curr,
    };
  }, {});
  return selection as any;
});

/**
 *  This tracks the user selections
 */
export const trackedSelectionAtom = atom<Record<number, OptionSelection>>({});

export const trackSelectionFamily = atomFamily((idx: number) =>
  atom<OptionSelection, OptionSelection>(
    (get) => {
      return get(trackedSelectionAtom)[idx];
    },
    (get, set, option) => {
      const current = get(trackedSelectionAtom);
      set(trackedSelectionAtom, {
        ...current,
        [idx]: option,
      });
    },
  ),
);

/**
 * Resume preview state
 */

export const resumePreviewItemsAtom = atom((get) => {
  const trackedSelection = get(trackedSelectionAtom);
  const product = get(currentProductAtom);
  return Object.values(trackedSelection).map((obj, idx) => {
    const option = product.options?.find((b) => obj.id === b.id);
    const subOptions = obj.options.map((b) =>
      option?.subOptions?.find((d) => d.id == b),
    );
    return {
      step: idx,
      option: option,
      subOptions: subOptions,
    };
  });
});

/**
 *  Return an array of atoms for each item, so they can be updated independently
 */
export const resumePreviewAtomsAtom = splitAtom(resumePreviewItemsAtom);

export const currentStepAtom = atom(0);

export const isLastStepAtom = atom((get) => {
  const product = get(currentProductAtom);
  const currentStep = get(currentStepAtom);
  return !!((product?.options?.length ?? 1) - 1 == currentStep);
});

export const currentOptionsFamily = atomFamily((id: number) =>
  atom((get) => {
    const selection = get(selectionAtom);
    return selection[id];
  }),
);

export const modalResumeStateAtom = atom(false);

export const modalConfirmSelectionAtom = atom(false);
