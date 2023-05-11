import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Card,
  Dropdown,
  Button,
  ButtonGroup,
  Form,
} from 'react-bootstrap';
import { FormInput } from '../../../../components';

import classNames from 'classnames';
// Form Editor
import { EditorState, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// dummy data
import { TaskItemTypes } from './data';
import { Link } from 'react-router-dom';
import { Avatar } from '../../../../components/Avatar';

interface TaskItemInterface {
  task: TaskItemTypes;
  closeTask: () => void;
  removeTask: (task: TaskItemTypes) => void;
  completeTask: (task: TaskItemTypes, result: string) => void;
}

const Task = ({
  task,
  closeTask,
  removeTask,
  completeTask,
}: TaskItemInterface) => {
  const [result, setResult] = useState<string>('');
  const [editorState, setEditorState] = useState<any>();

  useEffect(() => {
    if (task.description) {
      const html = task.description;
      const contentBlock = htmlToDraft(html);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        setEditorState(EditorState.createWithContent(contentState));
      }
    }
  }, [task.description]);

  /**
   * On editor body change
   */
  const onEditorStateChange = (editorStates: any) => {
    setEditorState(editorStates);
  };

  /*
   * mark completd on selected task
   */
  const completeHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    completeTask(task, result);
    setResult('');
  };

  const removeTaskHandler = (task: TaskItemTypes) => {
    removeTask(task);
  };

  return (
    <React.Fragment>
      <Card className="ribbon-box">
        <Card.Body>
          <Row>
            <Col>
              <div className="d-flex align-items-start">
                <h3 className="flex-grow-1 mt-0 me-5">{task.title}</h3>
                <Button
                  variant="white"
                  className="p-1 lh-1 border-0 fs-5"
                  onClick={closeTask}
                >
                  <i className="mdi mdi-close"></i>
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row>
                <Col>
                  <p className="mt-2 mb-1 text-muted">Assigned To</p>
                  <div className="d-flex align-items-start">
                    <Avatar
                      name="Arya"
                      secondName="Stark"
                      size="xs"
                      className="me-2"
                    />
                    <div className="flex-grow-1">
                      <h5 className="mt-1 font-size-14">
                        {task.assigned_to.name +
                          ' ' +
                          task.assigned_to.lastName}
                      </h5>
                    </div>
                  </div>
                </Col>

                <Col>
                  <p className="mt-2 mb-1 text-muted">Due Date</p>
                  <div className="d-flex align-items-start">
                    <i className="mdi mdi-calendar-month-outline font-18 text-success me-1"></i>
                    <div className="w-100">
                      <h5 className="mt-1 font-size-14">{task.due_date}</h5>
                    </div>
                  </div>
                </Col>
                {task.type && (
                  <Col>
                    <p className="mt-2 mb-1 text-muted">Task Type</p>
                    <div className="d-flex align-items-start">
                      <i
                        className={classNames(
                          'mdi',
                          `mdi-${task.type.icon}`,
                          'font-18 text-success me-1'
                        )}
                      ></i>
                      <div className="w-100">
                        <h5 className="mt-1 font-size-14">{task.type.title}</h5>
                      </div>
                    </div>
                  </Col>
                )}

                {task.deal && (
                  <>
                    <div className="w-100"></div>
                    <Col>
                      <p className="mt-2 mb-1 text-muted">Deal</p>
                      <div className="d-flex align-items-start">
                        <i
                          className={classNames(
                            'mdi',
                            `mdi-handshake-outline`,
                            'font-18 text-success me-1'
                          )}
                        ></i>
                        <div className="w-100">
                          <h5 className="mt-1 font-size-14">
                            <Link to={task.deal.link}>{task.deal.title}</Link>
                          </h5>
                        </div>
                      </div>
                    </Col>
                  </>
                )}
              </Row>

              <Row className="mt-1">
                <Col>
                  <Editor
                    disabled
                    toolbarHidden
                    toolbarClassName="draft-toolbar"
                    wrapperClassName="react-draft-wrapper"
                    editorStyle={{ minHeight: '150px' }}
                    editorState={editorState}
                    onEditorStateChange={onEditorStateChange}
                    readOnly
                  />
                </Col>
              </Row>
              {task.result && (
                <Row className="mt-1 mb-3">
                  <Col>
                    <h4 className="mb-3 mt-0">Last result</h4>
                    <div className="d-flex align-items-center">
                      <Avatar
                        name={task.result.user.name}
                        secondName={task.result.user.lastName}
                        size="sm"
                        className="me-2"
                      />
                      <div className="flex-grow-1">
                        <h5 className="mt-0 mb-1">
                          {task.result.user.name +
                            ' ' +
                            task.result.user.lastName}{' '}
                          <small className="text-muted float-end">
                            {task.result.date}
                          </small>
                        </h5>
                        {task.result.info}
                      </div>
                    </div>
                  </Col>
                </Row>
              )}
              <hr className="my-3" />
              <Form
                onSubmit={completeHandler}
                id="result-form"
                className="mb-3"
              >
                <FormInput
                  required
                  rows="3"
                  type="textarea"
                  name="result"
                  className="resize-none mb-2"
                  placeholder="Write new result..."
                  value={result}
                  onChange={(e) => setResult(e.target.value)}
                />
                <Form.Check
                  type="checkbox"
                  id="new-task"
                  label="Add new task to the deal"
                />
              </Form>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="float-start">
                <Button
                  className="me-2"
                  variant="danger"
                  onClick={() => removeTaskHandler(task)}
                >
                  <i className="mdi mdi-delete-outline"></i>
                </Button>
              </div>

              <div className="float-end">
                <Dropdown as={ButtonGroup} drop="start" className="me-2">
                  <Dropdown.Toggle split variant="light">
                    <i className="mdi mdi-cog-outline"></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="1">Change Assignee</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Change Task Type</Dropdown.Item>
                    <Dropdown.Item eventKey="3">Change Date</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Button
                  variant="success"
                  type="submit"
                  form="result-form"
                  className="waves-effect waves-light"
                >
                  Done
                  <span className="btn-label btn-label-right">
                    <i className="mdi mdi-check-all"></i>
                  </span>
                </Button>
              </div>
              <div className="clearfix"></div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default Task;
