export type ExpectedNode = {
  canonical: string;
  aliases: string[];
};

export type ExpectedEdge = {
  source: string; // canonical name
  target: string; // canonical name
};

export type Scenario = {
  id: string;
  title: string;
  description: string;
  nodes: ExpectedNode[];
  edges: ExpectedEdge[];
};

export const scenarios: Record<string, Scenario> = {
  library: {
    id: 'library',
    title: 'Library',
    description: 'A library needs to track books and members. Members can borrow books.',
    nodes: [
      {
        canonical: 'books',
        aliases: ['book', 'titles', 'title', 'publications', 'items', 'catalog'],
      },
      {
        canonical: 'members',
        aliases: ['member', 'users', 'user', 'borrowers', 'borrower', 'patrons', 'patron', 'readers', 'reader', 'accounts', 'account', 'persons', 'people'],
      },
      {
        canonical: 'loans',
        aliases: ['loan', 'borrowings', 'borrowing', 'checkouts', 'checkout', 'lendings', 'lending', 'borrows', 'borrow', 'rentals', 'rental'],
      },
    ],
    edges: [
      { source: 'books', target: 'loans' },
      { source: 'members', target: 'loans' },
    ],
  },
};
