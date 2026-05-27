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
  level: number;
  title: string;
  description: string;
  nodes: ExpectedNode[];
  edges: ExpectedEdge[];
};

export const scenarios: Record<string, Scenario> = {
  library: {
    id: 'library',
    level: 1,
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

  blog: {
    id: 'blog',
    level: 2,
    title: 'Blog',
    description: 'A blogging platform where authors write posts. Readers can leave comments on posts.',
    nodes: [
      {
        canonical: 'authors',
        aliases: ['author', 'writers', 'writer', 'users', 'user', 'bloggers', 'blogger', 'creators', 'creator'],
      },
      {
        canonical: 'posts',
        aliases: ['post', 'articles', 'article', 'entries', 'entry', 'blogs', 'blog', 'content'],
      },
      {
        canonical: 'comments',
        aliases: ['comment', 'replies', 'reply', 'responses', 'response', 'feedback', 'messages', 'message'],
      },
    ],
    edges: [
      { source: 'authors', target: 'posts' },
      { source: 'posts', target: 'comments' },
    ],
  },

  hospital: {
    id: 'hospital',
    level: 3,
    title: 'Hospital',
    description: 'A hospital needs to track doctors and patients. Doctors can see many patients, and patients can be seen by many doctors.',
    nodes: [
      {
        canonical: 'doctors',
        aliases: ['doctor', 'physicians', 'physician', 'providers', 'provider', 'staff', 'clinicians', 'clinician'],
      },
      {
        canonical: 'patients',
        aliases: ['patient', 'clients', 'client', 'persons', 'people', 'individuals', 'cases'],
      },
      {
        canonical: 'appointments',
        aliases: ['appointment', 'visits', 'visit', 'consultations', 'consultation', 'sessions', 'session', 'bookings', 'booking', 'encounters', 'encounter'],
      },
    ],
    edges: [
      { source: 'doctors', target: 'appointments' },
      { source: 'patients', target: 'appointments' },
    ],
  },
};

// Ordered list for level progression
export const scenarioOrder = ['library', 'blog', 'hospital'];
