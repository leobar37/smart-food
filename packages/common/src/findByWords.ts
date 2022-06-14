type Options = {
  caseSensitive: boolean;
  exact: boolean;
};

export const buildFindByWords = (words: string[], options: Options) => {
  const { caseSensitive, exact } = options;
  const isEqual = (a: string, b: string) => {
    if (!caseSensitive) {
      return a.toLocaleLowerCase() === b.toLocaleLowerCase();
    }
    return a === b;
  };
  const find = (text: string) => {
    text = (text ?? '').trim();
    if (text.length === 0) {
      return false;
    }
    const evaluate = (value: string) => {
      return words.some((a) => isEqual(a, value));
    };
    if (exact) {
      return evaluate(text);
    }
    return text.split(/\s+/).some(evaluate);
  };

  return find;
};

const matcher = buildFindByWords(['hola', 'hello', 'holu'], {
  caseSensitive: false,
  exact: true,
});

matcher('hola');
