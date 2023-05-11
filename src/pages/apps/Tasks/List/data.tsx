import avatarImg2 from '../../../../assets/images/users/user-9.jpg';
import avatarImg3 from '../../../../assets/images/users/user-3.jpg';
import avatarImg4 from '../../../../assets/images/users/user-4.jpg';
import avatarImg5 from '../../../../assets/images/users/user-5.jpg';
import avatarImg6 from '../../../../assets/images/users/user-6.jpg';

interface DealInterface {
  id: string;
  title: string;
  link: string;
}

interface TaskTypeInterface {
  icon: string;
  title: string;
}

interface ResultInterface {
  user: {
    name: string;
    lastName: string;
  };
  info: string;
  date: string;
}

export interface TaskItemTypes {
  id: number;
  title: string;
  assigned_to: {
    name: string;
    lastName: string;
  };
  assignee_avatar: string;
  due_date: string;
  deal?: DealInterface;
  type?: TaskTypeInterface;
  completed: boolean;
  priority: string;
  stage: string;
  description: string;
  result?: ResultInterface;
}

const todayTasks: TaskItemTypes[] = [
  {
    id: 1,
    title: 'Draft the new contract document for sales team',
    assigned_to: { name: 'Arya', lastName: 'Stark' },
    assignee_avatar: avatarImg2,
    due_date: 'Today 10am',
    completed: false,
    priority: 'High',
    stage: 'Todo',
    deal: {
      id: '2',
      title: 'Deal #1',
      link: '/requests',
    },
    type: {
      icon: 'phone-alert-outline',
      title: 'Contact',
    },
    result: {
      user: {
        name: 'John',
        lastName: 'Doe',
      },
      info: 'Result text for current or next assignee',
      date: new Date('2023-01-26').toLocaleDateString(),
    },
    description:
      // tslint:disable-next-line: max-line-length
      '<p>This is a task description with markup support</p><ul><li>Select a text to reveal the toolbar.</li><li>Edit rich document on-the-fly, so elastic!</li></ul><p>End of air-mode area</p>',
  },
  {
    id: 2,
    title: 'iOS App home page',
    assigned_to: { name: 'James', lastName: 'B' },
    assignee_avatar: avatarImg3,
    due_date: 'Today 4pm',
    deal: {
      id: '1',
      title: 'This is extra large Deal Name of #2',
      link: '/requests',
    },
    type: {
      icon: 'file-alert-outline',
      title: 'Document',
    },
    completed: false,
    stage: 'In-progress',
    priority: 'High',
    description:
      // tslint:disable-next-line: max-line-length
      '<p>This is a task description with markup support</p><ul><li>Select a text to reveal the toolbar.</li><li>Edit rich document on-the-fly, so elastic!</li></ul><p>End of air-mode area</p>',
  },
  {
    id: 3,
    title: 'Write a release note',
    assigned_to: { name: 'Kevin', lastName: 'C' },
    assignee_avatar: avatarImg4,
    due_date: 'Today 4pm',
    completed: false,
    stage: 'In-progress',
    priority: 'Medium',
    description:
      // tslint:disable-next-line: max-line-length
      '<p>This is a task description with markup support</p><ul><li>Select a text to reveal the toolbar.</li><li>Edit rich document on-the-fly, so elastic!</li></ul><p>End of air-mode area</p>',
  },
];

const upcomingTasks: TaskItemTypes[] = [
  {
    id: 4,
    title: 'Invite user to a project',
    assigned_to: { name: 'Arya', lastName: 'Stark' },
    assignee_avatar: avatarImg2,
    due_date: 'Tomorrow 10am',
    stage: 'Todo',
    completed: false,
    priority: 'Low',
    description:
      // tslint:disable-next-line: max-line-length
      '<p>This is a task description with markup support</p><ul><li>Select a text to reveal the toolbar.</li><li>Edit rich document on-the-fly, so elastic!</li></ul><p>End of air-mode area</p>',
  },
  {
    id: 5,
    title: 'Enable analytics tracking',
    assigned_to: { name: 'James', lastName: 'B' },
    assignee_avatar: avatarImg5,
    due_date: '27 Aug 10am',
    completed: false,
    stage: 'Review',
    priority: 'Low',
    description:
      // tslint:disable-next-line: max-line-length
      '<p>This is a task description with markup support</p><ul><li>Select a text to reveal the toolbar.</li><li>Edit rich document on-the-fly, so elastic!</li></ul><p>End of air-mode area</p>',
  },
  {
    id: 6,
    title: 'Code HTML email template',
    assigned_to: { name: 'Kevin', lastName: 'C' },
    assignee_avatar: avatarImg6,
    due_date: 'No Due Date',
    completed: false,
    stage: 'Review',
    priority: 'Medium',
    description:
      // tslint:disable-next-line: max-line-length
      '<p>This is a task description with markup support</p><ul><li>Select a text to reveal the toolbar.</li><li>Edit rich document on-the-fly, so elastic!</li></ul><p>End of air-mode area</p>',
  },
];

const otherTasks: TaskItemTypes[] = [
  {
    id: 7,
    title: 'Coordinate with business development',
    assigned_to: { name: 'Arya', lastName: 'Stark' },
    assignee_avatar: avatarImg2,
    due_date: 'No Due Date',
    stage: 'Todo',
    completed: false,
    priority: 'High',

    description:
      // tslint:disable-next-line: max-line-length
      '<p>This is a task description with markup support</p><ul><li>Select a text to reveal the toolbar.</li><li>Edit rich document on-the-fly, so elastic!</li></ul><p>End of air-mode area</p>',
  },
  {
    id: 8,
    title: 'Kanban board design',
    assigned_to: { name: 'James', lastName: 'B' },
    assignee_avatar: avatarImg5,
    stage: 'Review',
    due_date: '30 Aug 10am',
    completed: false,
    priority: 'Low',

    description:
      // tslint:disable-next-line: max-line-length
      '<p>This is a task description with markup support</p><ul><li>Select a text to reveal the toolbar.</li><li>Edit rich document on-the-fly, so elastic!</li></ul><p>End of air-mode area</p>',
  },
  {
    id: 9,
    title: 'Draft the new contract document for sales team',
    assigned_to: { name: 'Kevin', lastName: 'C' },
    assignee_avatar: avatarImg6,
    due_date: 'No Due Date',
    stage: 'Todo',
    completed: false,
    priority: 'Medium',

    description:
      // tslint:disable-next-line: max-line-length
      '<p>This is a task description with markup support</p><ul><li>Select a text to reveal the toolbar.</li><li>Edit rich document on-the-fly, so elastic!</li></ul><p>End of air-mode area</p>',
  },
  {
    id: 10,
    title: 'Draft the new contract document for vendor Abc',
    assigned_to: { name: 'Kevin', lastName: 'C' },
    assignee_avatar: avatarImg6,
    due_date: '2 Sep 10am',
    completed: false,
    stage: 'Todo',
    priority: 'Medium',

    description:
      // tslint:disable-next-line: max-line-length
      '<p>This is a task description with markup support</p><ul><li>Select a text to reveal the toolbar.</li><li>Edit rich document on-the-fly, so elastic!</li></ul><p>End of air-mode area</p>',
  },
];

const allTasks = [...todayTasks, ...upcomingTasks, ...otherTasks];

export { todayTasks, upcomingTasks, otherTasks, allTasks };
