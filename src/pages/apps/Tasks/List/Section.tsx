import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  Collapse,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import classNames from 'classnames';
import { ReactSortable } from 'react-sortablejs';

// dummy data
import { TaskItemTypes } from './data';
import { Avatar } from '../../../../components/Avatar';

const Task = ({
  task,
  list,
  selectTask,
}: {
  task: TaskItemTypes;
  list: string;
  selectTask: (task: TaskItemTypes, list: string) => void;
}) => {
  return (
    <>
      <Row className="justify-content-sm-between">
        <span className="task-item"></span>
        <Col lg={6} className="mb-2 ps-3">
          <Link
            to="#"
            className="text-body"
            onClick={() => selectTask(task, list)}
          >
            {task.title}
          </Link>
        </Col>
        <Col lg={6}>
          <div className="d-flex justify-content-between">
            <div>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip
                    id={task.assigned_to.name + ' ' + task.assigned_to.lastName}
                  >
                    Assigned to{' '}
                    {task.assigned_to.name + ' ' + task.assigned_to.lastName}
                  </Tooltip>
                }
              >
                <div>
                  <Avatar
                    name={task.assigned_to.name}
                    secondName={task.assigned_to.lastName}
                    size="xs"
                  />
                </div>
              </OverlayTrigger>
            </div>
            {task.deal && (
              <div>
                <div className="d-flex align-items-center">
                  <i
                    className={classNames(
                      'mdi',
                      `mdi-handshake-outline`,
                      'font-16 me-1'
                    )}
                  ></i>
                  <div className="w-100 font-13">
                    <Link to={task.deal.link}>Open Deal</Link>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-3 mt-sm-0">
              <ul className="list-inline font-13 text-end">
                <li className="list-inline-item pe-1">
                  <i className="mdi mdi-calendar-month-outline font-16 me-1"></i>{' '}
                  {task.due_date}
                </li>
                <li className="list-inline-item">
                  <span
                    className={classNames(
                      'badge',
                      {
                        'badge-soft-danger': task.priority === 'High',
                        'badge-soft-info': task.priority === 'Medium',
                        'badge-soft-success': task.priority === 'Low',
                      },
                      'p-1'
                    )}
                  >
                    {task.priority}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

interface TaskSectionState {
  title: string;
  tasks: TaskItemTypes[];
  list: string;
  selectTask: (task: TaskItemTypes, list: string) => void;
  setTaskList: React.Dispatch<React.SetStateAction<TaskItemTypes[]>>;
}

const TaskSection = ({
  title,
  tasks,
  selectTask,
  list,
  setTaskList,
}: TaskSectionState) => {
  const [collapse, setCollapse] = useState<boolean>(true);

  /*
   * toggle task-dropdown
   */
  const toggleTask = () => setCollapse(!collapse);

  return (
    <>
      <Link className="text-dark" to="#" onClick={toggleTask}>
        <h5 className="m-0">
          <i
            className={classNames(
              'mdi',
              { 'mdi-chevron-down': collapse, 'mdi-chevron-right': !collapse },
              'font-18'
            )}
          ></i>
          {title} <span className="text-muted font-14">({tasks.length})</span>
        </h5>
      </Link>
      <Collapse in={collapse}>
        <Card className="mb-0 shadow-none">
          <Card.Body className="pb-0">
            <ReactSortable
              group="taskList1"
              handle=".task-item"
              list={tasks}
              setList={setTaskList}
            >
              {(tasks || []).map((task, idx) => (
                <Task
                  selectTask={selectTask}
                  list={list}
                  task={task}
                  key={idx}
                />
              ))}
            </ReactSortable>
          </Card.Body>
        </Card>
      </Collapse>
    </>
  );
};

export default TaskSection;
