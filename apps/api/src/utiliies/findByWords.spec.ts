import { buildFindByWords } from './findByWords';
describe('test buildFindByWords', () => {
  it('when pass exact,evaluate the complete text', () => {
    const input = ['Empezar', 'menu', 'opciones'];
    const matchGetStarted = buildFindByWords(input, {
      caseSensitive: false,
      exact: false,
    });
    expect(matchGetStarted('empezar')).toBe(true);
    expect(matchGetStarted('menu')).toBe(true);
    expect(matchGetStarted('opciones')).toBe(true);
    expect(matchGetStarted('hola')).toBe(false);
  });
  it('when exact is false, evalute the word in the sentence', () => {
    const input = ['Empezar', 'menu', 'opciones'];
    const matchGetStarted = buildFindByWords(input, {
      caseSensitive: false,
      exact: false,
    });
    expect(matchGetStarted('quiero empezar')).toBe(true);
    expect(matchGetStarted('ver el menu')).toBe(true);
    expect(matchGetStarted('muestrame las opciones')).toBe(true);
    expect(matchGetStarted('hola')).toBe(false);
  });
  it('Case sensitive option', () => {
    const input = ['Empezar', 'menu', 'opciones'];
    const matchGetStarted = buildFindByWords(input, {
      caseSensitive: true,
      exact: false,
    });
    expect(matchGetStarted('quiero empezar')).toBe(false);
    expect(matchGetStarted('Deseo Empezar')).toBe(true);
    expect(matchGetStarted('dejame ver las Opciones')).toBe(false);
    expect(matchGetStarted('dejame ver las opciones')).toBe(true);
  });
});
