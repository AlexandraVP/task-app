import React, {Component} from 'react';
import style from './main-page.module.css';
import CreateForm from '../create-form/create-form';
import {Button} from "../button/button";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../../modules";
import {readTasks, deleteTask} from "../../modules/tasks";
import {RouteComponentProps} from "react-router-dom";

type State = {
    isModalShown: boolean
};

const connector =  connect((state: RootState) => ({
    tasks: state.tasks.items
}), {readTasks, deleteTask});


type Props = ConnectedProps<typeof connector> & RouteComponentProps;


class MainPage extends Component<Props, State> {

    state = {
        isModalShown: false
    };

    toggleModal = () => {
        this.setState(state => ({
            isModalShown: !state.isModalShown
        }));
    };

    componentDidMount() {
        this.props.readTasks();
    }

    toTaskPage = (id: number) => {
        this.props.history.push(`/tasks/${id}`);
    };

    render() {

        return (
            <React.Fragment>
                {this.state.isModalShown && (
                    <CreateForm close={this.toggleModal}/>
                )}
                <div className={style.page}>
                    <div className={style.layout}>
                        <div className={style.header}>
                            <div className={style.listTask}>Список задач</div>
                            <Button buttonType='primary'
                                    onClick={this.toggleModal}>Добавить</Button>
                        </div>
                        {this.props.tasks.map(task => (
                            <div className={style.main} key={task.id}>
                                <div className={style.taskNumber}>
                                    <p>{task.id}</p>
                                </div>
                                <div className={style.taskDescription}>
                                    <p>{task.title}</p>
                                </div>
                                <div className={style.actions}>
                                    <div className={style.edit} onClick={()=>this.toTaskPage(task.id)}>
                                        <i className="fas fa-pencil-alt"></i>
                                    </div>
                                    <div className={style.delete} onClick={()=>this.props.deleteTask(task.id)}>
                                        <i className="fas fa-trash-alt"></i>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const MainPageContainer =connector(MainPage);


export default MainPageContainer;
