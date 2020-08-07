import React, {Component} from 'react';
import style from "./create-form.module.css";
import {Button} from "../button/button";
import {connect, ConnectedProps} from "react-redux";
import {createTask} from "../../modules/tasks";

type State = {
    text: string,
    error: string | null
}

const connector = connect(null,{createTask});
type ReduxProps =  ConnectedProps<typeof connector>;

type Props = ReduxProps & {
    close: (event?: React.MouseEvent<HTMLElement>) => void
}

class CreateForm extends Component<Props, State> {

    state = {
        text: '',
        error: null
    };

    createTask = () => {
        const text  = this.state.text.trim();
        if(!text){
            this.setState({error: 'Заголовок не может быть пустым'});
            return;
        }
        this.props.createTask(text);
        this.props.close();
    };

    updateText = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            error: null,
            text: event.target.value
        });
    };

    render() {
        return (
            <div className={style.square}>
                <div className={style.modalSquare}>
                    <div className={style.header}>
                        <div className={style.descriptionSquare}>Краткое описание</div>
                        <div className={style.closeSquare} onClick={this.props.close}>
                            <i className="fas fa-times"></i>
                        </div>
                    </div>
                    <div className={style.body}>
                        <input className={style.input} onChange={this.updateText} value={this.state.text}/>
                        {this.state.error && (
                            <div className={style.error}>{this.state.error}</div>
                        )}
                    </div>
                    <div className={style.footer}>
                        <Button buttonType='secondary' onClick={this.createTask}>Создать</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connector(CreateForm);
