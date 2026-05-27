import { describe, it, expect } from 'vitest';
import { grade } from './grader';
import { scenarios } from './scenarios';

const scenario = scenarios['library'];

describe('grade – library scenario', () => {
  it('correct: all nodes and edges present', () => {
    const nodes = [
      { id: '1', name: 'books' },
      { id: '2', name: 'members' },
      { id: '3', name: 'loans' },
    ];
    const edges = [
      { source: '1', target: '3' },
      { source: '2', target: '3' },
    ];
    expect(grade(nodes, edges, scenario)).toMatchObject({ correct: true });
  });

  it('detects missing loans node', () => {
    const nodes = [{ id: '1', name: 'books' }, { id: '2', name: 'members' }];
    expect(grade(nodes, [], scenario).missingNodes).toContain('loans');
  });

  it('resolves alias: "checkouts" counts as loans', () => {
    const nodes = [
      { id: '1', name: 'books' },
      { id: '2', name: 'members' },
      { id: '3', name: 'checkouts' },
    ];
    const edges = [{ source: '1', target: '3' }, { source: '2', target: '3' }];
    expect(grade(nodes, edges, scenario)).toMatchObject({ correct: true });
  });

  it('resolves alias: "borrowings" counts as loans', () => {
    const nodes = [
      { id: '1', name: 'books' },
      { id: '2', name: 'members' },
      { id: '3', name: 'borrowings' },
    ];
    const edges = [{ source: '1', target: '3' }, { source: '2', target: '3' }];
    expect(grade(nodes, edges, scenario)).toMatchObject({ correct: true });
  });

  it('flags unrecognized node as extraNode', () => {
    const nodes = [{ id: '1', name: 'foobar' }];
    expect(grade(nodes, [], scenario).extraNodes).toContain('foobar');
  });

  it('detects missing edges when all nodes present', () => {
    const nodes = [
      { id: '1', name: 'books' },
      { id: '2', name: 'members' },
      { id: '3', name: 'loans' },
    ];
    const diff = grade(nodes, [], scenario);
    expect(diff.missingEdges).toHaveLength(2);
    expect(diff.correct).toBe(false);
  });

  it('edges are undirected: reverse connection still passes', () => {
    const nodes = [
      { id: '1', name: 'books' },
      { id: '2', name: 'members' },
      { id: '3', name: 'loans' },
    ];
    const edges = [
      { source: '3', target: '1' },
      { source: '3', target: '2' },
    ];
    expect(grade(nodes, edges, scenario)).toMatchObject({ correct: true });
  });

  it('flags extra edge between recognized nodes', () => {
    const nodes = [
      { id: '1', name: 'books' },
      { id: '2', name: 'members' },
      { id: '3', name: 'loans' },
    ];
    // books → members is not an expected edge
    const edges = [
      { source: '1', target: '3' },
      { source: '2', target: '3' },
      { source: '1', target: '2' },
    ];
    const diff = grade(nodes, edges, scenario);
    expect(diff.extraEdges).toHaveLength(1);
    expect(diff.extraEdges[0]).toMatchObject({ source: 'books', target: 'members' });
    expect(diff.correct).toBe(false);
  });

  it('normalizes capitalization: "Books" matches books', () => {
    const nodes = [
      { id: '1', name: 'Books' },
      { id: '2', name: 'Members' },
      { id: '3', name: 'Loans' },
    ];
    const edges = [{ source: '1', target: '3' }, { source: '2', target: '3' }];
    expect(grade(nodes, edges, scenario)).toMatchObject({ correct: true });
  });
});
