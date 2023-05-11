import React, { FC } from 'react'
import { Link } from 'react-router-dom';
import classNames from 'classnames';

// dummy data
import { TaskTypes } from './data';

interface TaskItemProps {
    task: TaskTypes;
}

// task item
const TaskItem: FC <TaskItemProps> = (props) => {
    const task = props.task || {};

    return (
        <>
            <span
                className={classNames('badge', 'float-end', {
                    'bg-soft-danger text-danger': task.priority === 'High',
                    'bg-soft-secondary text-secondary': task.priority === 'Medium',
                    'bg-soft-success text-success': task.priority === 'Low',
                })}
            >
                {task.priority}
            </span>

            <h5 className="mt-0">
                <Link to="#" className="text-dark">
                    {task.title}
                </Link>
            </h5>

            <p>{task.description}</p>

            <div className="clearfix"></div>

            <div className="row">
                <div className="col">
                    <p className="font-13 mt-2 mb-0">
                        <i className="mdi mdi-calendar"></i> {task.dueDate}
                    </p>
                </div>
                <div className="col-auto">
                    <div className="text-end">
                        {(task.userAvatar || []).map((avatar, index) => {
                            return (
                                <Link key={index} to="#" className="text-muted">
                                    <img src={avatar} alt="" className="avatar-sm img-thumbnail rounded-circle" />
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default TaskItem;
