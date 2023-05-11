import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Dropdown, Modal, Button, Offcanvas } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';

// components
import PageTitle from '../../../../components/PageTitle';
import HyperDatepicker from '../../../../components/Datepicker';
import { VerticalForm, FormInput } from '../../../../components/';

import TaskItem from './Task';

// dummy data
import { tasks, TaskTypes, columns, ColumnTypes, kanbans, KanbanNames, messages, TasksMessage } from './data';

import defaultAvatar from '../../../../assets/images/users/user-12.jpg';

interface StateType {
    allTasks: TaskTypes[];
    allColumns: ColumnTypes[];
    allKanbans: KanbanNames[];
    allMessages: TasksMessage[];
}

interface UserData {
  username: string;
  description: string;
  priority: string;
  responsible: string;
  price: number;
}

interface OptionTypes {
    id: number | string;
    value: string;
    label: string;
}
let allStateTasks: any = [];

// kanban
const Kanban = () => {
    
    const [state, setState] = useState<StateType>({
        allTasks: tasks,
        allColumns: columns,
        allKanbans: kanbans,
        allMessages: messages,
    });

    const [totalTasks, setTotalTasks] = useState<number>(tasks.length);
    const [totalColumns, setTotalColumns] = useState<number>(columns.length);
    const [totalKanbans, setTotalKanbans] = useState<number>(kanbans.length);
    const [totalMessages, setTotalMessages] = useState<number>(messages.length);
    const [newTaskModal, setNewTaskModal] = useState<boolean>(false);
    const [newColumnModal, setNewColumnModal] = useState<boolean>(false);
    const [newTaskDetails, setNewTaskDetails] = useState<any>(null);
    const [newColumnDetails, setNewColumnDetails] = useState<any>(null);
    const [idTask, setIdTask] = useState<number>(0);
    const [idColumn, setIdColumn] = useState<number>(0);
    const [idKanban, setIdKanban] = useState<number>(0);
    const [show, setShow] = useState<boolean>(false);
    const [showTask, setShowTask] = useState<boolean>(false);
    const [multiSelections, setMultiSelections] = useState<OptionTypes[]>([]);
    
    const options: Array<OptionTypes> = [
        { id: 1, value: 'Бизнес', label: 'Бизнес' },
        { id: 2, value: 'Магазин', label: 'Магазин' },
        { id: 3, value: 'Лендинг', label: 'Лендинг' },
    ];
        
    state.allColumns.forEach((e, index) => {
        allStateTasks[e.title] = state.allTasks.filter((t) => t.status === e.title)
    });

    /**
     * handle modal toggle
     */
    const toggle = () => {
        setShow((prevState) => !prevState);
    };

    /**
     * handle modal toggle
     */
    const toggleTask = () => {
        setShowTask((prevState) => !prevState);
    };

     /**
     * Getting an id Task
     */
    const handleChangeTask = (event: number) => {
        setIdTask(event);
    }

    /**
     * Getting an id Column
     */
    const handleChangeColumn = (event: number) => {
        setIdColumn(event);
    }

     /**
     * Getting an id Kanban
     */
    const handleChangeKanban = (event: number) => {
        setIdKanban(--event);
    }

    /**
     * Multi select
     */
    const onChangeMultipleSelection = (selected: OptionTypes[]) => {
        setMultiSelections(selected);
    };
    /*
     * Form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            // title: yup.string().required(),
            // priority: yup.string().required(),
            // description: yup.string().required(),
        })
    );

    /*
     * Form methods
     */
    const methods = useForm({ resolver: schemaResolver });
    const {
        handleSubmit,
        register,
        control,
        reset,
        formState: { errors },
    } = methods;

    /**
     * Toggles the new task modal
     */
    const toggleNewTaskModal = () => {
        setNewTaskModal((prevstate) => !prevstate);

        // reset the form after submission
        reset();
    };

     /**
     * Toggles the new column modal
     */
    const toggleNewColumnModal = () => {
        setNewColumnModal((prevstate) => !prevstate);

        // reset the form after submission
        reset();
    };

    /**
     * Creates new empty task with given status
     * @param status
     * @param queue
     * @param typeAction
     */
    const newTask = (typeAction: string) => {
        setNewTaskDetails({
            dueDate: new Date(),
            userAvatar: [defaultAvatar],
            typeAction: typeAction,
        });

        setNewTaskModal(true);
    };

    /**
     * Creates new empty task with given status
     * @param typeAction
     */
    const newColumn = (typeAction: string) => {
        setNewColumnDetails({
            typeAction: typeAction,
        });

        setNewColumnModal(true);
    };

    /**
     * When date changes
     * @param {} date
     */
    const handleDateChange = (date: Date) => {
        if (newTaskDetails) {
            // setState({
            //     ...state,
            //     newTask: { ...state.newTask, dueDate: date },
            // });
            setNewTaskDetails({ ...newTaskDetails, dueDate: date });
        }
    };

    // a little function to help us with reordering the result
    const reorder = (list: any[], startIndex: number, endIndex: number) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

      /**
     * Moves an item from one list to another list.
     */
    const move = (
        source: Iterable<unknown> | ArrayLike<unknown>,
        destination: Iterable<unknown> | ArrayLike<unknown>,
        droppableSource: { index: number; droppableId: string | number },
        droppableDestination: { index: number; droppableId: string | number }
    ) => {
        const sourceClone = Array.from(allStateTasks[droppableSource.droppableId]);
        const destClone: any = Array.from(allStateTasks[droppableDestination.droppableId]);
        let [removed] = sourceClone.splice(droppableSource.index, 1);
        destClone.splice(droppableDestination.index, 0, removed);
        const result: any = {};
       
        destClone.forEach((e: any) => {
            if(e.status === droppableSource.droppableId) {
                e.status = droppableDestination.droppableId;
                return true;
            }
        });
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;
        
        return result;
    };

    /**
     * Gets the list
     */
    const getList = (id: string) => {
        const modifiedState: any = { ...state };
        const stateTasks: any = modifiedState[id] && modifiedState[id];
        return stateTasks;
    };

    /**
     * On drag end
     */
    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }
        if (source.droppableId === destination.droppableId) {
            const items = reorder(getList('allTasks'), source.index, destination.index);
            let localState: any = { ...state };
            localState[source.droppableId] = items;
            setState(localState);
        } else {
           
            const result = move(getList(source.droppableId), getList(destination.droppableId), source, destination);
            const localState = { ...state, ...result };
            allStateTasks[source.droppableId] = localState[source.droppableId];
            allStateTasks[destination.droppableId] = localState[destination.droppableId];
        }
    };
    console.log(allStateTasks);
    /**
     * Handles the new task form submission
     */
    const handleNewTask = (values: any) => {
        let temp = [...getList('allColumns')];
        let status: string = 'Upcoming';
        for(let item = 0; item < temp.length; item++) 
            if(temp[item].kambanName === state.allKanbans[idKanban].title) {
                status = temp[item].title
                break;
            }

        const formData = {
            title: values['title'],
            description: values['description'],
            status: status,
            priority: values['priority'],
            kambanName: state.allKanbans[idKanban].title,
            responsible: '',
            price: 0,
            prepayment: 0,
            addhost: false,
            adddomen: false,
            addfill: false,
        };

        const newTask = {
            id: totalTasks + 1,
            ...formData,
            dueDate: newTaskDetails.dueDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            }),
        };

        let modifiedState: any = { ...state };
        let tasks = [...getList('allTasks'), newTask];
        modifiedState['allTasks'] = [...tasks];
        console.log(modifiedState);
        setState(modifiedState);
        setNewTaskModal(false);
        setTotalTasks(totalTasks + 1);

        // reset the form after submission
        reset();
    };


    /**
     * Handles the edit task form submission
     */
    const handleEditTask = (values: any) => {
        const formData = {
            title: values['title'],
            priority: values['priority'],
            description: values['description'],
            responsible: values['responsible'],
            price: values['price'],
            prepayment: values['prepayment'],
            addhost: values['addhost'],
            adddomen: values['adddomen'],
            addfill: values['addfill'],
            kambanName: state.allKanbans[idKanban].title,
        };
        
        let temp = [...getList('allTasks')];
        for(let item = 0; item < temp.length; item++) {
            if(temp[item].id === idTask) {
                temp[item].title = formData.title;
                temp[item].priority = formData.priority;
                temp[item].description = formData.description;
                temp[item].responsible = formData.responsible;
                temp[item].price = formData.price;
                temp[item].prepayment = formData.prepayment;
                temp[item].addhost = formData.addhost;
                temp[item].adddomen = formData.adddomen;
                temp[item].addfill = formData.addfill;
            }
        }

        let tempColumns = [...getList('allColumns')];
        let price:number = 0;
        for(let itemTwo = 0; itemTwo < tempColumns.length; itemTwo++) {
            tempColumns[itemTwo].price = price;
            for(let item = 0; item < temp.length; item++) {
                if(temp[item].status === tempColumns[itemTwo].title) {
                    price += Number(temp[item].price);
                }
            }    
            tempColumns[itemTwo].price = price;
            price = 0;
        }
        
        let modifiedState: any = { ...state };
        modifiedState['allTasks'] = temp;
        modifiedState['allColumns'] = tempColumns;
        setShowTask(false);
        setState(modifiedState);

        // reset the form after submission
        reset();
    };


    /**
    * Handles the delete task form submission
    */
    const handleDeleteTask = () => {
        let temp = [...getList('allTasks')];
        let modifiedState: any = { ...state };
        
        for(let item = 0; item < temp.length; item++) 
            if(temp[item].id === idTask)
                temp.splice(item, 1);  
        
        modifiedState['allTasks'] = temp;
        setState(modifiedState);
        setShowTask(false);
        handleChangeTask(0);

        // reset the form after submission
        reset();
    };


    /**
     * Handles the new column form submission
     */
    const handleNewColumn = (values: any) => {
       const formData = {
            title: values['title'],
            description: values['description'],
            kambanName: state.allKanbans[idKanban].title,
            price: 0,
        };

        const newColumn = {
            id: totalColumns + 1,
            ...formData,
        };

        let modifiedState: any = { ...state };
        let columns = [...getList('allColumns'), newColumn];
        modifiedState['allColumns'] = [...columns];

        setState(modifiedState);
        setNewColumnModal(false);
        setTotalColumns(totalColumns + 1);

        // reset the form after submission
        reset();
    };


    /**
     * Handles the edit column form submission
     */
    const handleEditColumn = (values: any) => {
        const formData = {
            title: values['title'],
            description: values['description'],
            kambanName: state.allKanbans[idKanban].title,
        };

        let temp = [...getList('allColumns')];
        let tempTwo = [...getList('allTasks')];

        for(let item = 0; item < temp.length; item++) 
            if(temp[item].id === idColumn) {
                for(let itemTwo = 0; itemTwo < tempTwo.length; itemTwo++) 
                    if(tempTwo[itemTwo].status === temp[item].title) {
                        tempTwo[itemTwo].status = values['title'];
                    }
                temp[item].title = formData.title;
                temp[item].description = formData.description;
            }
        
        

        let modifiedState: any = { ...state };
        modifiedState['allColumns'] = temp;
        modifiedState['allTasks'] = tempTwo;
        setNewColumnModal(false);
        setState(modifiedState);

        // reset the form after submission
        reset();
    };


    /**
    * Handles the delete column form submission
    */
    const handleDeleteColumn = () => {
        let temp = [...getList('allColumns')];

        for(let item = 0; item < temp.length; item++) 
            if(temp[item].id === idColumn) 
                temp.splice(item, 1); 

        let modifiedState: any = { ...state };
        modifiedState['allColumns'] = temp;
        setNewColumnModal(false);
        setState(modifiedState);

        // reset the form after submission
        reset();
    };


    /**
     * Handles the new kanban form submission
     */
    const handleNewKanban = (values: any) => {
        const formData = {
            title: values['title'],
        };

        const newKanban = {
            id: totalKanbans + 1,
            ...formData,
        };

        
        let modifiedState: any = { ...state };
        let kanban = [...getList('allKanbans'), newKanban];
        modifiedState['allKanbans'] = [...kanban];
        
        setState(modifiedState);
        setTotalKanbans(totalKanbans + 1);

        // reset the form after submission
        reset();
    };
 
    /**
     * Handles the new message form submission
     */
    const handleNewMessage = (values: any) => {
        let dateTime = new Date(),
            Hour = dateTime.getHours(),
            Minutes = dateTime.getMinutes()
        let allDate = Hour + ':' + Minutes;

        const formData = {
            id_task: idTask,
            name: 'Валерий',
            message: values['message'],
            userAvatar: [defaultAvatar],
            date: allDate,
        };

         const newMessage = {
            id: totalMessages + 1,
            ...formData,
        };

        
        let modifiedState: any = { ...state };
        let message = [...getList('allMessages'), newMessage];
        modifiedState['allMessages'] = [...message];

        setState(modifiedState);
        setTotalMessages(totalMessages + 1);

        // reset the form after submission
        reset();
    }   

    let temp = [...getList('allTasks')];
    let tempColumns = [...getList('allColumns')];
    let price:number = 0;
    for(let itemTwo = 0; itemTwo < tempColumns.length; itemTwo++) {
        tempColumns[itemTwo].price = price;
        for(let item = 0; item < temp.length; item++) {
            if(temp[item].status === tempColumns[itemTwo].title) {
                price += Number(temp[item].price);
            }
        }    
        tempColumns[itemTwo].price = price;
        price = 0;
    }

    return (
        <React.Fragment>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Tasks', path: 'apps/tasks/kanban' },
                    { label: 'Kanban Board', path: 'apps/tasks/kanban', active: true },
                ]}
                title={state.allKanbans[idKanban].title}
            />

            <div className='d-flex jusity-content-between'>
                <Button variant="primary" className='mb-3' onClick={toggle}>
                    Kanbans
                </Button>

                <Link
                    to="#"
                    className="btn btn-primary w-10 ms-auto mb-3 waves-effect waves-light"
                    onClick={() => newTask('Create')}
                >
                    <i className="mdi mdi-plus-circle"></i> Add New Task
                </Link>
            </div>

            <div className="d-flex ">
                <Offcanvas show={show} onHide={toggle}>
                    <Offcanvas.Body>
                        <div className="list-group list-group-flush">
                            {(state.allKanbans || []).map((itemKanban) => (
                                <span className={classNames('list-group-item', {
                                        'active': itemKanban.title === state.allKanbans[idKanban].title,
                                    })} 
                                    style={{cursor: 'pointer'}}
                                    onClick={() => { 
                                        setShow(false)
                                        handleChangeKanban(itemKanban.id);
                                    }}
                                >{itemKanban.title}</span>
                            ))}
                        </div>
                        <div className="form-group d-flex mt-3">
                            <form onSubmit={handleSubmit(handleNewKanban)} className="px-2">
                                <div className='d-flex'>
                                    <FormInput
                                        name="title"
                                        placeholder="Kanban Name"
                                        type="text"
                                        register={register}
                                        key="title"
                                        errors={errors}
                                        control={control}
                                        style={{width: '250px'}}
                                        />
                                    <button type="submit" className="btn btn-primary ms-3">Create</button>
                                </div>
                            </form>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>

                <Offcanvas show={showTask} onHide={toggleTask} placement={'end'} style={{ width: '89vw' }}>
                    <Offcanvas.Body style={{ padding: 0, display: 'flex', backgroundColor: 'rgb(219, 219, 219)' }}>
                        <div className='card-entity-form__fields'>
                            <div className='card-entity-form__top'>
                                {/* <div className="arrow cursor-pointer" onClick={() => {setShowTask(false)}}></div> */}
                                <div className='card-fields__top-name-block'>
                                    {(state.allTasks || []).map((item, index) => (
                                        item.id === idTask ? (
                                        <VerticalForm<UserData>
                                            onSubmit={handleEditTask}
                                            defaultValues={{ 
                                                title: item.title, 
                                                description: item.description,
                                                priority: item.priority, 
                                                responsible: item.responsible,
                                                price: item.price,
                                                prepayment: item.prepayment,
                                                addhost: item.addhost,
                                                adddomen: item.adddomen,
                                                addfill: item.addfill,
                                            }}
                                        >
                                            <FormInput
                                                label={'Title'}
                                                type="text"
                                                name="title"
                                                placeholder={'Enter your Title'}
                                                containerClass={'mb-3'}
                                                className='textareaNone'
                                            />

                                            <FormInput
                                                label={'Description'}
                                                type="text"
                                                name="description"
                                                placeholder={'Enter your Description'}
                                                containerClass={'mb-3'}
                                                className='textareaNone'
                                            />
                                            <FormInput
                                                label={'Priority'}
                                                type="select"
                                                name="priority"
                                                placeholder={'Enter your Priority'}
                                                containerClass={'mb-3'}
                                                className="form-select form-control-light"
                                                style={{ width: '200px' }}
                                                >
                                                <option value="">Select</option>
                                                <option value="Low">Low</option>
                                                <option value="Medium">Medium</option>
                                                <option value="High">High</option>
                                            </FormInput>
                                            
                                            <FormInput
                                                label={'Ответственный'}
                                                type="text"
                                                name="responsible"
                                                placeholder={'Ответственный'}
                                                containerClass={'mb-3 mt-5'}
                                                className='textareaNoneTwo'
                                            />

                                            <FormInput
                                                label={'Бюджет'}
                                                type="number"
                                                name="price"
                                                containerClass={'mb-3'}
                                                className='textareaNoneTwo'
                                                placeholder='0'
                                            />

                                            <FormInput
                                                label={'Предоплата'}
                                                type="number"
                                                name="prepayment"
                                                containerClass={'mb-3'}
                                                className='textareaNoneTwo'
                                            />

                                            <FormInput name="addhost" label="Есть хостинг" type="checkbox" />
                                            <FormInput name="adddomen" label="Есть домен" type="checkbox" />
                                            <FormInput name="addfill" label="Есть наполнение" type="checkbox" />
                                            <p className="text-muted font-14 mt-3">Вид сайта</p>
                                            <Typeahead
                                                id="select3"
                                                labelKey="label"
                                                multiple
                                                onChange={onChangeMultipleSelection}
                                                options={options}
                                                placeholder="Выберите сайт(ы)"
                                                selected={multiSelections}
                                            />
                                            
                                            <button type="submit" className="editTaskBtn btn btn-primary ms-3">Edit</button>
                                        </VerticalForm>
                                        ) : ('')
                                    ))}
                                    <button type="button" className="editTaskBtn btn btn-danger" style={{ marginLeft: '100px' }} onClick={() => handleDeleteTask()}>Delete</button>
                                </div>
                            </div>
                        </div>
                        <div className='chats-tasks'>
                            <h1 className='mb-3 headerMessages'>Здесь будет чат!!!</h1>

                            <div className='messageWrapper'>
                                {(state.allMessages || []).map((item, index) => (
                                      item.id_task === idTask ? (
                                    <div className='d-flex mb-3'>
                                        {(item.userAvatar || []).map((avatar, index) => {
                                            return (
                                                <Link key={index} to="#" className="text-muted">
                                                    <img src={avatar} alt="" className="avatar-sm img-thumbnail rounded-circle" 
                                                    style={{ 
                                                        height: '3.5rem',
                                                        width: '3.5rem',
                                                    }} />
                                                </Link>
                                            );
                                        })}
                                        <div className='widthMessage'>
                                            <div>Сегодня: {item.date} От: {item.name} Кому: всем</div>
                                            <div className='messageTitle'>{item.message}</div>
                                        </div>
                                    </div>
                                    ) : ('')
                                ))}               
                            </div>                                                

                            <div className='textarea-cahts'>
                                <form onSubmit={handleSubmit(handleNewMessage)} className="px-2">
                                    <FormInput
                                        type="textarea"
                                        name="message"
                                        rows="5"
                                        containerClass={'mb-3'}
                                        register={register}
                                        key="textarea"
                                        errors={errors}
                                        control={control}
                                        placeholder='Введите сообщние...'
                                        className='messageTextareaChat'
                                    />
                                        <Button variant="primary" type="submit">Отправить</Button>
                                    </form>
                            </div>
                        </div>
                        <div className='widgets'>
                            <h1 className='mb-3 headerMessages'>Виджеты</h1>
                            <details className="widgetsWarning">
                                <summary>Get Doc</summary>
                                <p>Some text to be hidden.</p> 
                                <p>Some text to be hidden.</p> 
                                <p>Some text to be hidden.</p> 
                                <p>Some text to be hidden.</p> 
                            </details>
                            
                            <details className="widgetsInfo">
                                <summary>SMS.RU</summary>
                                <p>Social distance, quarantine and isolation</p>
                                <p>Hand hygiene, cough etiquette, cleaning and laundry</p>
                                <p>When children have acute respiratory tract infections</p>
                                <p>Risk groups and their relatives</p>
                            </details>
                            
                            <details className="widgetsAlert">
                                <summary>Wazzup</summary>
                                <p>Some text to be hidden.</p> 
                                <p>Some text to be hidden.</p> 
                                <p>Some text to be hidden.</p> 
                                <p>Some text to be hidden.</p> 
                            </details>
                            <button type="submit" onClick={() => {
                                alert(`Этот блог находится в разработке!!!
                                Приносим свой извинения...`)}
                            } className="btn btn-outline-primary m-3">Добавить виджет</button>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
            
            

            <Row className='boardRow'>
                <DragDropContext onDragEnd={onDragEnd}>
                    {/* todo */}
                    {(state.allColumns || []).map((itemColumns, index) => (
                        itemColumns.kambanName === state.allKanbans[idKanban].title ? (
                        <Droppable droppableId={itemColumns.title}>
                            {(provided) => (
                                <Col ref={provided.innerRef} style={{ width: '400px', flex: 'none' }}>
                                    <Card>
                                        <Card.Body>
                                            <Dropdown className="float-end d-flex flex-column align-items-end" align="end">
                                                <Dropdown.Toggle as="a" className="cursor-pointer">
                                                    <i className="mdi mdi-dots-vertical m-0 text-muted h3"></i>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => {
                                                        handleChangeColumn(itemColumns.id);
                                                        newColumn('Edit');
                                                    }}>Edit</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => { 
                                                        handleChangeColumn(itemColumns.id);
                                                        newColumn('Delete');
                                                    }}>Delete</Dropdown.Item>
                                                </Dropdown.Menu>
                                                <div className='me-1'>
                                                    {itemColumns.price}<span className='ms-1'>$</span></div>
                                            </Dropdown>

                                            <h5 className="header-title">{itemColumns.title}</h5>
                                            <p className="sub-header">{itemColumns.description}</p>
                                            {/* <ul className="sortable-list tasklist list-unstyled" id={itemColumns.title}>
                                                {(state.allTasks || []).map((item, index) => (
                                                    itemColumns.title === item.status && item.kambanName === state.allKanbans[idKanban].title ? (
                                                        <Draggable key={item.id} draggableId={item.id + ''} index={index}>
                                                            {(provided, snapshot) => (
                                                                <li
                                                                    onClick={() => {
                                                                        handleChangeTask(item.id);
                                                                        toggleTask()
                                                                        // newOffCanvas(itemColumns.title, 'Edit')
                                                                        // newTask(itemColumns.title, 'Edit')
                                                                    }}
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                >
                                                                    <TaskItem task={item}  />
                                                                </li>
                                                            )}
                                                        </Draggable>
                                                    ) : ('')
                                                ))}
                                                {provided.placeholder}
                                            </ul> */}
                                             <ul className="sortable-list tasklist list-unstyled" id={itemColumns.title}>
                                                {(allStateTasks[itemColumns.title]).map((item: any, index: number) => (
                                                    <Draggable key={item.id} draggableId={item.id + ''} index={index}>
                                                        {(provided, snapshot) => (
                                                            <li
                                                                onClick={() => {
                                                                    handleChangeTask(item.id);
                                                                    toggleTask()
                                                                    // newOffCanvas(itemColumns.title, 'Edit')
                                                                    // newTask(itemColumns.title, 'Edit')
                                                                }}
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <TaskItem task={item}  />
                                                            </li>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </ul>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )}
                        </Droppable>
                    ) : ('') ))}
                </DragDropContext>
                    <Col style={{ width: '550px', flex: 'none' }}>
                        <Card>
                            <Card.Body>
                                <Link
                                    to="#"
                                    className="btn btn-primary w-100 mt-3 waves-effect waves-light"
                                    onClick={() => newColumn('Create')}
                                >
                                    <i className="mdi mdi-plus-circle"></i> Add New Column
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
            </Row>

            {/* add new task modal */}
            {newTaskDetails && (
                <Modal show={newTaskModal} onHide={toggleNewTaskModal} size="lg" centered>
                    <Modal.Header closeButton>
                        <h4 className="modal-title">{newTaskDetails.typeAction} New Task new</h4>
                    </Modal.Header>
                    {newTaskDetails.typeAction === 'Create' && (
                    <Modal.Body>
                        <form onSubmit={handleSubmit(handleNewTask)} className="px-2">
                            <FormInput
                                name="title"
                                label="Title"
                                placeholder="Enter title"
                                type="text"
                                containerClass="mb-3"
                                className="form-control form-control-light"
                                register={register}
                                key="title"
                                errors={errors}
                                control={control}
                            />

                            <FormInput
                                name="description"
                                label="Description"
                                placeholder="Enter description"
                                type="textarea"
                                containerClass="mb-3"
                                className="form-control form-control-light"
                                rows="3"
                                register={register}
                                key="description"
                                errors={errors}
                                control={control}
                            />

                            <Row>
                                <Col md={6}>
                                    <FormInput
                                        name="priority"
                                        label="Priority"
                                        type="select"
                                        containerClass="mb-3"
                                        className="form-select form-control-light"
                                        register={register}
                                        key="priority"
                                        errors={errors}
                                        control={control}
                                    >
                                        <option value="">Select</option>
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </FormInput>
                                </Col>
                                <Col md={6}>
                                    <div className="mb-3">
                                        <label className="form-label">Due Date</label> <br />
                                        <HyperDatepicker
                                            hideAddon
                                            dateFormat="yyyy-MM-dd"
                                            value={newTaskDetails.dueDate}
                                            inputClass="form-control-light"
                                            onChange={(date) => {
                                                handleDateChange(date);
                                            }}
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <div className="text-end">
                                <Button variant="light" className="me-1" onClick={toggleNewTaskModal}>
                                    Cancel
                                </Button>
                                <Button variant="primary" type="submit">
                                    {newTaskDetails.typeAction}
                                </Button>
                            </div>
                        </form>
                    </Modal.Body>
                    )}

                    {newTaskDetails.typeAction === 'Edit' && (
                    <Modal.Body>
                        <form onSubmit={handleSubmit(handleEditTask)} className="px-2">
                            <FormInput
                                name="title"
                                label="Title"
                                placeholder="Enter title"
                                type="text"
                                containerClass="mb-3"
                                className="form-control form-control-light"
                                register={register}
                                key="title"
                                errors={errors}
                                control={control}
                            />

                            <FormInput
                                name="description"
                                label="Description"
                                placeholder="Enter description"
                                type="textarea"
                                containerClass="mb-3"
                                className="form-control form-control-light"
                                rows="3"
                                register={register}
                                key="description"
                                errors={errors}
                                control={control}
                            />

                            <Row>
                                <Col md={6}>
                                    <FormInput
                                        name="priority"
                                        label="Priority"
                                        type="select"
                                        containerClass="mb-3"
                                        className="form-select form-control-light"
                                        register={register}
                                        key="priority"
                                        errors={errors}
                                        control={control}
                                    >
                                        <option value="">Select</option>
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </FormInput>
                                </Col>
                                <Col md={6}>
                                    <div className="mb-3">
                                        <label className="form-label">Due Date</label> <br />
                                        <HyperDatepicker
                                            hideAddon
                                            dateFormat="yyyy-MM-dd"
                                            value={newTaskDetails.dueDate}
                                            inputClass="form-control-light"
                                            onChange={(date) => {
                                                handleDateChange(date);
                                            }}
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <div className="text-end">
                                <Button variant="danger" className='me-3' type="button" onClick={() => handleDeleteTask()}>
                                    Delete
                                </Button>
                                <Button variant="primary" type="submit">
                                    {newTaskDetails.typeAction}
                                </Button>
                            </div>
                        </form>
                    </Modal.Body>
                    )}
                </Modal>
            )}

            {/* add new column modal */}
            {newColumnDetails && (
                <Modal show={newColumnModal} onHide={toggleNewColumnModal} size="lg" centered>
                    <Modal.Header closeButton>
                        <h4 className="modal-title">{newColumnDetails.typeAction} New Column new</h4>
                    </Modal.Header>
                    {newColumnDetails.typeAction === 'Create' && (
                    <Modal.Body>
                        <form onSubmit={handleSubmit(handleNewColumn)} className="px-2">
                            <FormInput
                                name="title"
                                label="Title"
                                placeholder="Enter title"
                                type="text"
                                containerClass="mb-3"
                                className="form-control form-control-light"
                                register={register}
                                key="title"
                                errors={errors}
                                control={control}
                            />

                            <FormInput
                                name="description"
                                label="Description"
                                placeholder="Enter description"
                                type="textarea"
                                containerClass="mb-3"
                                className="form-control form-control-light"
                                rows="3"
                                register={register}
                                key="description"
                                errors={errors}
                                control={control}
                            />

                            <div className="text-end">
                                <Button variant="primary" type="submit">
                                    {newColumnDetails.typeAction}
                                </Button>
                            </div>
                        </form>
                    </Modal.Body>
                    )} 
                    {newColumnDetails.typeAction === 'Edit' && (
                    <Modal.Body>
                        <form onSubmit={handleSubmit(handleEditColumn)} className="px-2">
                             <FormInput
                                name="title"
                                label="Title"
                                placeholder="Enter title"
                                type="text"
                                containerClass="mb-3"
                                className="form-control form-control-light"
                                register={register}
                                key="title"
                                errors={errors}
                                control={control}
                            />

                            <FormInput
                                name="description"
                                label="Description"
                                placeholder="Enter description"
                                type="textarea"
                                containerClass="mb-3"
                                className="form-control form-control-light"
                                rows="3"
                                register={register}
                                key="description"
                                errors={errors}
                                control={control}
                            />

                            <div className="text-end">
                                <Button variant="light" className="me-1" onClick={toggleNewColumnModal}>
                                    Cancel
                                </Button>
                                <Button variant="primary" type="submit">
                                    {newColumnDetails.typeAction}
                                </Button>
                            </div>
                        </form>
                    </Modal.Body>
                    )} 
                    {newColumnDetails.typeAction === 'Delete' && (
                    <Modal.Body>
                        <form onSubmit={handleSubmit(handleDeleteColumn)} className="px-2">
                            <h3>
                                Do you really want to delete the column
                            </h3>
                            <div className="text-center mt-3">
                                <Button variant="danger" type="submit">
                                    {newColumnDetails.typeAction}
                                </Button>
                                <Button variant="primary" className="ms-2" onClick={toggleNewColumnModal}>
                                    Exit
                                </Button>
                            </div>
                        </form>
                    </Modal.Body>
                    )} 
                </Modal>
            )}
        </React.Fragment>
    );
};

export default Kanban;
