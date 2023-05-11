import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import YandexIco from '../assets/images/brands/yandex.svg';
import GmailIco from '../assets/images/brands/gmail.svg';
import TelegramIco from '../assets/images/brands/telegram.svg';

interface UserData {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    token: string;
    post: string;
    birthday: Date;
}

interface IntegrationInt {
    id: number;
    name: string;
    img: string;
    link?: string;
    status: number;
}

interface StaffData {
    id: number;
    name: string;
    secondName: string;
    email: string;
    created_date: string;
}


interface IntegrationsInt {
    mails: IntegrationInt[];
    messengers: IntegrationInt[];
}

var mock = new MockAdapter(axios);

export function configureFakeBackend() {
    let users: UserData[] = [
        {
            id: 1,
            username: 'test',
            password: 'test',
            email: 'test@test.ru',
            firstName: 'Test',
            lastName: 'User',
            post: 'CEO',
            birthday: new Date('1993-12-01'),
            role: 'Admin',
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb2RlcnRoZW1lcyIsImlhdCI6MTU4NzM1NjY0OSwiZXhwIjoxOTAyODg5NDQ5LCJhdWQiOiJjb2RlcnRoZW1lcy5jb20iLCJzdWIiOiJzdXBwb3J0QGNvZGVydGhlbWVzLmNvbSIsImxhc3ROYW1lIjoiVGVzdCIsIkVtYWlsIjoic3VwcG9ydEBjb2RlcnRoZW1lcy5jb20iLCJSb2xlIjoiQWRtaW4iLCJmaXJzdE5hbWUiOiJIeXBlciJ9.P27f7JNBF-vOaJFpkn-upfEh3zSprYfyhTOYhijykdI',
        },
    ];

    let staff: StaffData[] = [
        {
            id: 1,
            name: 'Paul',
            secondName: 'Friend',
            email: 'pauljfrnd@jourrapide.com',
            created_date: new Date('2017-01-26').toLocaleDateString(),
        },
        {
            id: 2,
            name: 'Bryan',
            secondName: 'Luellen',
            email: 'bryuellen@dayrep.com',
            created_date: new Date('2018-05-02').toLocaleDateString(),
        },
        {
            id: 3,
            name: 'Kathryn',
            secondName: 'Collier',
            email: 'collier@jourrapide.com',
            created_date: new Date('2018-07-10').toLocaleDateString(),
        },
        {
            id: 4,
            name: 'Timothy',
            secondName: 'Kauper',
            email: 'thykauper@rhyta.com',
            created_date: new Date('2019-01-29').toLocaleDateString(),
        },
        {
            id: 5,
            name: 'Zara',
            secondName: 'Raws',
            email: 'austin@dayrep.com',
            created_date: new Date('2019-03-15').toLocaleDateString(),
        },
        {
            id: 6,
            name: 'Annette',
            secondName: 'Kelsch',
            email: 'annette@email.net',
            created_date: new Date('2019-07-19').toLocaleDateString(),
        },
        {
            id: 7,
            name: 'Jenny',
            secondName: 'Gero',
            email: 'jennygero@teleworm.us',
            created_date: new Date('2019-12-24').toLocaleDateString(),
        },
        {
            id: 8,
            name: 'Edward',
            secondName: 'Roseby',
            email: 'edwardR@armyspy.com',
            created_date: new Date('2020-02-27').toLocaleDateString(),
        },
        {
            id: 9,
            name: 'Anna',
            secondName: 'Ciantar',
            email: 'edwardR@armyspy.com',
            created_date: new Date('2023-05-14').toLocaleDateString(),
        },
        {
            id: 10,
            name: 'Dean',
            secondName: 'Smithies',
            email: 'deanes@dayrep.com',
            created_date: new Date('2023-03-18').toLocaleDateString(),
        }
    ];

    let integrationsList: IntegrationsInt = {
        mails: [
            {
                id: 1,
                name: 'Yandex',
                img: YandexIco,
                link: 'https://link.ru?params=fsfs',
                status: 0,
            },
            {
                id: 2,
                name: 'Gmail',
                img: GmailIco,
                link: 'https://link.ru?params=fsfs',
                status: 1,
            },
        ],
        messengers: [
            {
                id: 1,
                name: 'Telegram',
                img: TelegramIco,
                status: 1,
            },
        ],
    };


    mock.onPost('/login/').reply(function (config) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                // get parameters from post request
                let params = JSON.parse(config.data);

                // find if any user matches login credentials
                let filteredUsers = users.filter((user) => {
                    return user.username === params.username && user.password === params.password;
                });

                if (filteredUsers.length) {
                    // if login details are valid return user details and fake jwt token
                    let user = {
                        id: filteredUsers[0].id,
                        firstName: filteredUsers[0].firstName,
                        lastName: filteredUsers[0].lastName,
                        token: filteredUsers[0].token,
                        role: filteredUsers[0].role
                    };
                    resolve([200, user]);
                } else {
                    // else return error
                    resolve([401, { message: 'Username or password is incorrect' }]);
                }
            }, 1000);
        });
    });

    mock.onPost('/forget-password/').reply(function (config) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                // get parameters from post request
                let params = JSON.parse(config.data);

                // find if any user matches login credentials
                let filteredUsers = users.filter((user) => {
                    return user.username === params.username;
                });

                if (filteredUsers.length) {
                    // if login details are valid return user details and fake jwt token
                    let responseJson = {
                        message: "Мы отправили вам ссылку для сброса пароля на зарегистрированный почтовый ящик.",
                    };
                    resolve([200, responseJson]);
                } else {
                    // else return error
                    resolve([401, { message: 'Sorry, we could not find any registered user with entered username', }]);
                }
            }, 1000);
        });
    });

    mock.onPost('/change-password/').reply(function (config) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                let params = JSON.parse(config.data);
                if (!params.token || !params.email) {
                    resolve([401, { message: 'Пройдите по ссылке с вашего письма на почте.' }])
                }
                if (params.password !== params.confirm) {
                    resolve([401, { message: 'Пароли в полях должны совпадать!' }])
                }

                let filteredUsers = users.filter((user) => {
                    return user.username === params.email && user.token === params.token;
                });

                if (filteredUsers.length) {
                    let responseJson = {
                        message: "Ваш пароль успешно изменен!",
                    };
                    resolve([200, responseJson]);
                } else {
                    // else return error
                    resolve([401, { message: 'Sorry, we could not find any registered user with entered username', }]);
                }

            }, 1000);
        });
    });

    mock.onPost('/my-account/').reply(function (config) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                let params = JSON.parse(config.data);
                let filteredUsers = users.filter((user) => {
                    return user.id === Number(params.userid);
                });

                if (filteredUsers.length) {
                    let userInfo = {
                        name: filteredUsers[0].firstName,
                        secondName: filteredUsers[0].lastName,
                        email: filteredUsers[0].email,
                        post: filteredUsers[0].post,
                        birthday: filteredUsers[0].birthday,
                    };
                    resolve([200, userInfo]);
                } else {
                    // else return error
                    resolve([401, { message: 'Sorry, we could not find any registered user with your id', }]);
                }

            }, 1000);
        });
    });

    mock.onPost('/my-account/update-profile/').reply(function (config) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                let params = JSON.parse(config.data);
                let filteredUsers = users.filter((user) => {
                    return user.id === Number(params.userid);
                });

                if (filteredUsers.length) {
                    let response = {
                        profile: {
                            name: params.data.name,
                            secondName: params.data.secondName,
                            email: params.data.email,
                            post: params.data.post,
                            birthday: params.data.birthday,
                        },
                        message: 'Ваш профиль успешно обновлён!'
                    };
                    resolve([200, response]);
                } else {
                    // else return error
                    resolve([401, { message: 'Sorry, we could not find any registered user with your id', }]);
                }

            }, 1000);
        });
    });

    mock.onPost('/my-account/update-password/').reply(function (config) {
        console.log(config)
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                let params = JSON.parse(config.data);

                if (params.data.confirm === '' || params.data.password === '') {
                    resolve([401, { message: 'Пароли должны быть заполнены' }])
                }

                if (params.data.password !== params.data.confirm) {
                    resolve([401, { message: 'Пароли в полях должны совпадать! Password Confirm и Password' }])
                }

                let filteredUsers = users.filter((user) => {
                    return user.id === Number(params.userid);
                });

                if (filteredUsers.length) {

                    if (filteredUsers[0].password !== params.data.oldPassword) {
                        resolve([401, { message: 'Не верно введен старый пароль.' }])
                    }

                    let response = {
                        message: 'Ваш пароль успешно обновлён!'
                    };

                    resolve([200, response]);
                } else {
                    // else return error
                    resolve([401, { message: 'Sorry, we could not find any registered user with your id', }]);
                }

            }, 1000);
        });
    });

    mock.onPost('/settings/integrations/').reply(function (config) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                let params = JSON.parse(config.data);
                let filteredUsers = users.filter((user) => {
                    return user.id === Number(params.userid);
                });

                if (filteredUsers.length) {
                    let integrations = integrationsList;
                    resolve([200, integrations]);
                } else {
                    // else return error
                    resolve([401, { message: 'Sorry, we could not find any registered user with your id', }]);
                }

            }, 1000);
        });
    });

    mock.onPost('/settings/disconnect/').reply(function (config) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                let params = JSON.parse(config.data);
                if (params.data.category === 'mails') {

                    integrationsList.mails = integrationsList.mails.map(item => {
                        item.id === params.client.id && (item.status = 0);
                        return item;
                    })

                }
                if (params.data.category === 'messengers') {

                    integrationsList.messengers = integrationsList.messengers.map(item => {
                        item.id === params.client.id && (item.status = 0);
                        return item;
                    })

                }
                resolve([200, integrationsList]);
            }, 1000);
        });
    });

    mock.onPost('/settings/connect/').reply(function (config) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                let params = JSON.parse(config.data);
                if (params.data.category === 'mails') {

                    integrationsList.mails = integrationsList.mails.map(item => {
                        item.id === params.client.id && (item.status = 1);
                        return item;
                    })

                }
                if (params.data.category === 'messengers') {

                    integrationsList.messengers = integrationsList.messengers.map(item => {
                        item.id === params.client.id && (item.status = 1);
                        return item;
                    })

                }
                resolve([200, integrationsList]);
            }, 1000);
        });
    });

    mock.onPost('/staff/').reply(function (config) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve([200, staff]);
            }, 1000);
        });
    });

    mock.onPost('/staff/remove/').reply(function (config) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                let params = JSON.parse(config.data);
                let filteredStaff = staff.filter((user) => {
                    return user.id !== params.data.id;
                });
                staff = filteredStaff;
                resolve([200, filteredStaff]);
            }, 1000);
        });
    });

    mock.onPost('/staff/add/').reply(function (config) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                let params = JSON.parse(config.data);
                staff.unshift(params.data);
                resolve([200, staff]);
            }, 1000);
        });
    });
}