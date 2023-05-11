import avatar1 from '../../../../assets/images/users/user-1.jpg';
import avatar2 from '../../../../assets/images/users/user-2.jpg';
import avatar3 from '../../../../assets/images/users/user-3.jpg';
import avatar5 from '../../../../assets/images/users/user-5.jpg';
import avatar6 from '../../../../assets/images/users/user-6.jpg';
import avatar7 from '../../../../assets/images/users/user-7.jpg';
import avatar8 from '../../../../assets/images/users/user-8.jpg';
import avatar9 from '../../../../assets/images/users/user-9.jpg';
import avatar10 from '../../../../assets/images/users/user-10.jpg';
// import avatar11 from '../../../../assets/images/users/user-11.jpg';
import avatar12 from '../../../../assets/images/users/user-12.jpg';
import avatar13 from '../../../../assets/images/users/user-13.png';

export interface TaskTypes {
    id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    userAvatar: string[];
    dueDate: string;
    kambanName: string;
    responsible: string;
    price: number;
    prepayment: number;
    addhost: boolean;
    adddomen: boolean;
    addfill: boolean;
}

const tasks: TaskTypes[] = [
    {
        id: 1,
        title: 'Ubold v3.0 - Redesign',
        description: 'There are many variations of passages of Lorem Ipsum available.',
        status: 'Upcoming',
        priority: 'High',
        userAvatar: [avatar1, avatar3],
        dueDate: 'Jul 18, 2019',
        kambanName: 'Kanban Board',
        responsible: 'Валера',
        price: 10,
        prepayment: 0,
        addhost: true,
        adddomen: false,
        addfill: false,
    },
    {
        id: 2,
        title: 'Minton v3.0 - Redesign',
        description: 'Many desktop publishing packages and web page.',
        status: 'InProgress',
        priority: 'Low',
        userAvatar: [avatar2],
        dueDate: 'Jul 20, 2019',
        kambanName: 'Kanban Board',
        responsible: '',
        price: 0,
        prepayment: 10,
        addhost: false,
        adddomen: true,
        addfill: false,
    },
    {
        id: 3,
        title: 'Ubold v2.1 - Angular and Django',
        description: 'If you are going to use a passage of Lorem Ipsum.',
        status: 'Completed',
        priority: 'Low',
        userAvatar: [avatar5],
        dueDate: 'Jul 21, 2019',
        kambanName: 'Kanban Board',
        responsible: '',
        price: 0,
        prepayment: 10,
        addhost: false,
        adddomen: true,
        addfill: false,
    },
    {
        id: 4,
        title: 'Ubold v2.1 - React, Webpack',
        description: 'It has roots in a piece of classical Latin literature from 45 BC.',
        status: 'Completed',
        priority: 'High',
        userAvatar: [avatar6, avatar7],
        dueDate: 'Jul 22, 2019',
        kambanName: 'Kanban Board',
        responsible: '',
        price: 0,
        prepayment: 10,
        addhost: true,
        adddomen: true,
        addfill: false,
    },
    {
        id: 5,
        title: 'Ubold 2.2 - Vue.Js and Laravel',
        description: 'There are many variations of passages of Lorem Ipsum available.',
        status: 'Upcoming',
        priority: 'Low',
        userAvatar: [avatar8],
        dueDate: 'Jul 18, 2019',
        kambanName: 'Kanban Board',
        responsible: '',
        price: 12,
        prepayment: 10,
        addhost: true,
        adddomen: true,
        addfill: false,
    },
    {
        id: 6,
        title: 'Ubold 2.3 - Rails, NodeJs, Mean',
        description: 'All the Lorem Ipsum generators on the Internet tend to repeat predefined.',
        status: 'Upcoming',
        priority: 'Medium',
        userAvatar: [avatar9, avatar10],
        dueDate: 'Jul 21, 2019',
        kambanName: 'Kanban Board',
        responsible: '',
        price: 0,
        prepayment: 10,
        addhost: false,
        adddomen: true,
        addfill: true,
    },
    {
        id: 7,
        title: 'Ubold - Landing page and UI Kit',
        description: 'Your awesome text goes here. Your awesome text goes here.',
        status: 'Completed',
        priority: 'Medium',
        userAvatar: [avatar1, avatar3],
        dueDate: 'Jul 10, 2019',
        kambanName: 'Kanban Board',
        responsible: '',
        price: 1,
        prepayment: 0,
        addhost: false,
        adddomen: true,
        addfill: true,
    },
    {
        id: 8,
        title: 'Ubold 3.0 - Scoping',
        description: 'A handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.',
        status: 'InProgress',
        priority: 'High',
        userAvatar: [avatar2],
        dueDate: 'Jul 24, 2019',
        kambanName: 'Kanban Board',
        responsible: '',
        price: 9,
        prepayment: 0,
        addhost: false,
        adddomen: true,
        addfill: true,
    },
    {
        id: 9,
        title: 'Shreyu 1.0 - Angular',
        description: 'There are many variations of passages of Lorem Ipsum available.',
        status: 'CompletedID',
        priority: 'Low',
        userAvatar: [avatar2],
        dueDate: 'Aug 18, 2019',
        kambanName: 'Kanban Board',
        responsible: '',
        price: 0,
        prepayment: 0,
        addhost: false,
        adddomen: false,
        addfill: true,
    },
    {
        id: 10,
        title: 'Shreyu 1.0 - React',
        description: 'All the Lorem Ipsum generators on the Internet tend to repeat predefined.',
        status: 'InProgress',
        priority: 'High',
        userAvatar: [avatar8],
        dueDate: 'Aug 18, 2019',
        kambanName: 'Kanban Board',
        responsible: '',
        price: 5,
        prepayment: 0,
        addhost: false,
        adddomen: false,
        addfill: true,
    },
    {
        id: 11,
        title: 'Minton 1.0 - Angular',
        description: 'There are many variations of passages of Lorem Ipsum available.',
        status: 'CompletedID',
        priority: 'Low',
        userAvatar: [avatar2],
        dueDate: 'Aug 18, 2019',
        kambanName: 'Kanban Board',
        responsible: '',
        price: 11,
        prepayment: 0,
        addhost: false,
        adddomen: false,
        addfill: true,
    },
    {
        id: 12,
        title: 'Test',
        description: 'TestTestTestTestTestTestTestTest',
        status: 'Test',
        priority: 'Low',
        userAvatar: [avatar2],
        dueDate: 'Aug 18, 2019',
        kambanName: 'Test',
        responsible: '',
        price: 1,
        prepayment: 0,
        addhost: false,
        adddomen: false,
        addfill: true,
    },
];


export interface ColumnTypes {
    id: number;
    title: string;
    description: string;
    kambanName: string;
    price: number;
}

const columns: ColumnTypes[] = [
    {
        id: 1,
        title: 'Upcoming',
        description: 'Your awesome text goes here. Your awesome text goes here.',
        kambanName: 'Kanban Board',
        price: 0,
    },
    {
        id: 2,
        title: 'InProgress',
        description: 'Your awesome text goes here.',
        kambanName: 'Kanban Board',
        price: 0,
    },
    {
        id: 3,
        title: 'Completed',
        description: 'Your awesome text goes here. Your awesome text goes here.',
        kambanName: 'Kanban Board',
        price: 0,
    },
    {
        id: 4,
        title: 'CompletedID',
        description: 'Your awesome text goes here. Your awesome text goes here.',
        kambanName: 'Kanban Board',
        price: 0,
    },
    {
        id: 5,
        title: 'Test',
        description: 'TestTestTestTestTestTest',
        kambanName: 'Test',
        price: 0,
    },
];


export interface KanbanNames {
    id: number;
    title: string;
}

const kanbans: KanbanNames[] = [
    {
        id: 1,
        title: 'Kanban Board',
    },
    {
        id: 2,
        title: 'Test',
    },
];

export interface TasksMessage {
    id: number;
    id_task: number;
    name: string;
    message: string;
    userAvatar: string[];
    date: string;
}

const messages: TasksMessage[] = [
    {
        id: 1,
        id_task: 1,
        name: 'Валерий',
        message: 'Kanban Board',
        userAvatar: [avatar12],
        date: '6:45',
    },
    {
        id: 2,
        id_task: 1,
        name: 'Валерий',
        message: 'Test',
        userAvatar: [avatar12],
        date: '6:45',
    },
    {
        id: 3,
        id_task: 1,
        name: 'Виталий',
        message: 'Где готовый блок сообщения?',
        userAvatar: [avatar13],
        date: '6:45',
    },
    {
        id: 4,
        id_task: 1,
        name: 'Валерий',
        message: 'Почти готов!!!',
        userAvatar: [avatar12],
        date: '6:45',
    },
    {
        id: 5,
        id_task: 1,
        name: 'Виталий',
        message: 'Ждуууу!!!!',
        userAvatar: [avatar13],
        date: '6:45',
    },
    {
        id: 6,
        id_task: 1,
        name: 'Валерий',
        message: 'Готово!!!',
        userAvatar: [avatar12],
        date: '6:45',
    },
];

export { tasks, columns, kanbans, messages };
