import React, { useState } from 'react';
import { Row, Col, Dropdown, Card, Modal, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// components
import PageTitle from '../../../../components/PageTitle';

import TaskSection from './Section';
import Task from './Task';

// dummy data
import { todayTasks, upcomingTasks, otherTasks, TaskItemTypes } from './data';
import { FormInput } from '../../../../components';
import HyperDatepicker from '../../../../components/Datepicker';
import { Typeahead } from 'react-bootstrap-typeahead';

interface OptionTypes {
  id: number | string;
  value: string;
  label: string;
}
// Task List
const TaskList = () => {
  const [todayTask, setTodayTask] = useState<TaskItemTypes[]>([...todayTasks]);
  const [taskDate, setTaskDate] = useState<Date>(new Date());
  const [upcomingTask, setUpcomingTask] = useState<TaskItemTypes[]>([
    ...upcomingTasks,
  ]);
  const [singleSelections, setSingleSelections] = useState<OptionTypes[]>([]);
  const [taskModal, setTaskModal] = useState<boolean>(false);
  const [otherTask, setOtherTask] = useState<TaskItemTypes[]>([...otherTasks]);
  const [selectedTask, setSelectedTask] = useState<TaskItemTypes | null>(null);
  const [selectedTaskList, setSelectedTaskList] = useState<string | null>(null);

  /**
   * Selects the task
   * @param {*} taks
   */
  const selectTask = (task: TaskItemTypes, list: string) => {
    setSelectedTask(task);
    setSelectedTaskList(list);
  };

  const closeTask = () => {
    setSelectedTask(null);
    setSelectedTaskList('');
  };

  const removeTask = (task: TaskItemTypes) => {
    let taskList;
    switch (selectedTaskList) {
      case 'today': {
        taskList = todayTask.filter((item) => item.id !== task.id);
        setTodayTask(taskList);

        break;
      }
      case 'upcoming': {
        taskList = upcomingTask.filter((item) => item.id !== task.id);
        setUpcomingTask(taskList);
        break;
      }
      case 'other': {
        taskList = otherTask.filter((item) => item.id !== task.id);
        setOtherTask(taskList);
        break;
      }
    }
    closeTask();
  };

  const completeTask = (task: TaskItemTypes, result: string) => {
    console.log(task);
  };

  const toggleNewTaskModal = () => {
    setTaskModal(!taskModal);
  };

  const handleSubmit = () => {};

  return (
    <>
      <PageTitle
        breadCrumbItems={[{ label: 'Tasks', path: '/tasks/', active: true }]}
        title={'Tasks'}
      />
      <Row>
        <Col xl={selectedTask ? 8 : 12}>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Row>
                    <Col sm={3}>
                      <Button
                        onClick={toggleNewTaskModal}
                        className="btn btn-primary waves-effect waves-light"
                      >
                        <i className="fe-plus me-1"></i>Add New
                      </Button>
                    </Col>
                    <Col sm={9}>
                      <div className="float-sm-end mt-3 mt-sm-0">
                        <Dropdown className="d-inline-block" align="end">
                          <Dropdown.Toggle variant="light">
                            <i className="mdi mdi-filter-variant"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item>Due Date</Dropdown.Item>
                            <Dropdown.Item>Added Date</Dropdown.Item>
                            <Dropdown.Item>Assignee</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </Col>
                  </Row>

                  <Row className="mt-4">
                    <Col>
                      {/* tasks */}
                      <div>
                        <TaskSection
                          title="Today"
                          list="today"
                          tasks={todayTask}
                          selectTask={selectTask}
                          setTaskList={setTodayTask}
                        ></TaskSection>
                      </div>
                      <div className="mt-4">
                        <TaskSection
                          list="upcoming"
                          title="Tomorrow"
                          tasks={upcomingTask}
                          selectTask={selectTask}
                          setTaskList={setUpcomingTask}
                        ></TaskSection>
                      </div>
                      <div className="mt-4 mb-4">
                        <TaskSection
                          list="other"
                          title="For The Future"
                          tasks={otherTask}
                          selectTask={selectTask}
                          setTaskList={setOtherTask}
                        ></TaskSection>
                      </div>
                    </Col>
                  </Row>

                  <div className="row mt-4">
                    <div className="col-12">
                      <div className="text-center">
                        <Link to="#" className="btn btn-sm btn-white">
                          <i className="mdi mdi-spin mdi-loading me-2"></i>
                          Load more
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
        {selectedTask && (
          <Col xl={4}>
            <Task
              task={selectedTask}
              closeTask={closeTask}
              removeTask={removeTask}
              completeTask={completeTask}
            />
          </Col>
        )}
      </Row>
      <Modal show={taskModal} onHide={toggleNewTaskModal} size="lg" centered>
        <Modal.Header closeButton>
          <h4 className="modal-title">Add New Task</h4>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} className="px-2">
            <Form.Group>
              <Form.Label>Deal</Form.Label>
              <Typeahead
                className="mb-3"
                id="deal"
                multiple={false}
                onChange={(d: OptionTypes[]) => {
                  setSingleSelections(d);
                }}
                inputProps={{ className: 'form-control-light' }}
                options={[
                  { id: 1, value: 'chocolate', label: 'Chocolate' },
                  { id: 2, value: 'strawberry', label: 'Strawberry' },
                  { id: 3, value: 'vanilla', label: 'Vanilla' },
                ]}
                placeholder="Choose a deal..."
                selected={singleSelections}
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Task Type</Form.Label>
                  <Typeahead
                    className="mb-3"
                    id="assign"
                    multiple={false}
                    onChange={(d: OptionTypes[]) => {
                      setSingleSelections(d);
                    }}
                    inputProps={{ className: 'form-control-light' }}
                    options={[
                      { id: 1, value: 'chocolate', label: 'Chocolate' },
                      { id: 2, value: 'strawberry', label: 'Strawberry' },
                      { id: 3, value: 'vanilla', label: 'Vanilla' },
                    ]}
                    placeholder="Choose task type..."
                    selected={singleSelections}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Assign To</Form.Label>
                  <Typeahead
                    className="mb-3"
                    id="assign"
                    multiple={false}
                    onChange={(d: OptionTypes[]) => {
                      setSingleSelections(d);
                    }}
                    inputProps={{ className: 'form-control-light' }}
                    options={[
                      { id: 1, value: 'chocolate', label: 'Chocolate' },
                      { id: 2, value: 'strawberry', label: 'Strawberry' },
                      { id: 3, value: 'vanilla', label: 'Vanilla' },
                    ]}
                    placeholder="Choose a assignee..."
                    selected={singleSelections}
                  />
                </Form.Group>
              </Col>
            </Row>

            <FormInput
              name="title"
              label="Title"
              placeholder="Enter title"
              type="text"
              containerClass="mb-3"
              className="form-control form-control-light"
              key="title"
            />

            <FormInput
              name="description"
              label="Description"
              placeholder="Enter description"
              type="textarea"
              containerClass="mb-3"
              className="form-control form-control-light"
              rows="3"
              key="description"
            />

            <Row>
              <Col md={6}>
                <FormInput
                  name="priority"
                  label="Priority"
                  type="select"
                  containerClass="mb-3"
                  className="form-select form-control-light"
                  key="priority"
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
                    dateFormat="dd.MM.yyyy, HH:mm"
                    minDate={new Date()}
                    value={taskDate}
                    inputClass="form-control-light"
                    showTimeSelect
                    timeFormat="HH:mm"
                    tI={30}
                    onChange={(date) => {
                      setTaskDate(date);
                    }}
                  />
                </div>
              </Col>
            </Row>

            <div className="text-end">
              <Button
                variant="light"
                className="me-1"
                onClick={toggleNewTaskModal}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Add
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TaskList;
