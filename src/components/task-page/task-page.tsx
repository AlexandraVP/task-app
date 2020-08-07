import React, {Component} from "react";
import {RouteComponentProps} from "react-router-dom";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../../modules";
import {editTask, readTasks} from "../../modules/tasks";
import style from './task-page.module.css';
import {Button} from "../button/button";

type RouterProps = RouteComponentProps<{ id: string }>

const connector = connect((state: RootState, props: RouterProps) => ({
    task: state.tasks.items.find(task => task.id === parseInt(props.match.params.id)),
    lastOperation: state.tasks.lastOperation
}), {readTasks, editTask});

type ReduxProps = ConnectedProps<typeof connector>

type Props = RouterProps & ReduxProps;

type State = {
    text: string | null
}

class TaskPage extends Component<Props, State> {

    state = {
        text: null
    };


    componentDidMount(): void {
        this.props.readTasks();
    }

    updateText = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            text: event.target.value
        });
    };

    applyChanges = () => {
        const {task} = this.props;
        if (!task) {
            return;
        }
        const text = (this.state.text || task.title).trim();
        this.props.editTask(task.id, text);
    };

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
        if(this.props.lastOperation === 'EDIT'){
            this.props.history.push('/');
        }
    }

    render() {
        const {task} = this.props;
        if (!task) {
            return null;
        }
        const text = this.state.text || task.title;
        return (
            <div className={style.page}>
                <div className={style.layout}>
                    <div className={style.root}>
                        <div className={style.header}>Задача №{task.id}</div>
                        <div className={style.title}>Краткое описание</div>
                        <input className={style.input} onChange={this.updateText} value={text}/>
                        <div className={style.btnContainer}>
                            <Button buttonType='secondary' onClick={this.applyChanges}>Вернуться к списку</Button>
                        </div>
                    </div>
                </div>
            </div>);
    }
}


export default connector(TaskPage);