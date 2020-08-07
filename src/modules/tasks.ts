import {Task} from "../types/types";
import {deleteRequest, getRequest, postRequest} from "../utils/api";

const READ_TASK_REQUEST = 'READ_TASKS/REQUEST';
const READ_TASK_SUCCESS = 'READ_TASKS/SUCCESS';
const READ_TASK_FAILURE = 'READ_TASKS/FAILURE';

const ADD_TASK_REQUEST = 'ADD_TASK/REQUEST';
const ADD_TASK_SUCCESS = 'ADD_TASK/SUCCESS';
const ADD_TASK_FAILURE = 'ADD_TASK/FAILURE';

const DELETE_TASK_REQUEST = 'DELETE_TASK/REQUEST';
const DELETE_TASK_SUCCESS = 'DELETE_TASK/SUCCESS';
const DELETE_TASK_FAILURE = 'DELETE_TASK/FAILURE';

const EDIT_TASK_REQUEST = 'EDIT_TASK_REQUEST';
const EDIT_TASK_SUCCESS = 'EDIT_TASK_SUCCESS';
const EDIT_TASK_FAILURE = 'EDIT_TASK_FAILURE';


type State = {
    items: Task[],
    processing: boolean,
    error: string | null,
    lastOperation: string | null
}

type ReadRequest = {
    type: typeof READ_TASK_REQUEST
}

type ReadResponse = {
    type: typeof READ_TASK_SUCCESS,
    data: {
        data: Task[]
    }
}

type ReadFailure = {
    type: typeof READ_TASK_FAILURE,
    error: any
}

type AddRequest = {
    type: typeof ADD_TASK_REQUEST
}

type AddResponse = {
    type: typeof ADD_TASK_SUCCESS,
    data: {
        id: number
    },
    payload: {
        title: string
    }
}

type AddFailure = {
    type: typeof ADD_TASK_FAILURE,
    error: any
}

type DeleteRequest = {
    type: typeof DELETE_TASK_REQUEST
}

type DeleteResponse = {
    type: typeof DELETE_TASK_SUCCESS,
    payload: {
        id: number
    }
}

type DeleteFailure = {
    type: typeof DELETE_TASK_FAILURE,
    error: any
}

type EditRequest = {
    type: typeof EDIT_TASK_REQUEST
}

type EditResponse = {
    type: typeof EDIT_TASK_SUCCESS
}

type EditFailure = {
    type: typeof EDIT_TASK_FAILURE,
    error: any
}

type Action = ReadRequest | ReadResponse | ReadFailure |
              AddRequest | AddResponse | AddFailure |
              DeleteRequest | DeleteResponse | DeleteFailure |
              EditRequest | EditResponse | EditFailure;

const initialState:State = {
    items: [],
    processing: true,
    error: null,
    lastOperation: null
};

export function readTasks(){
    return getRequest([READ_TASK_REQUEST, READ_TASK_SUCCESS, READ_TASK_FAILURE],
        'https://test.megapolis-it.ru/api/list');
}

export function createTask(title: string) {
    return postRequest([ADD_TASK_REQUEST, ADD_TASK_SUCCESS, ADD_TASK_FAILURE],
        'https://test.megapolis-it.ru/api/list',
        {title},
        {title}
        )
}

export function deleteTask(id: number) {
    return deleteRequest([DELETE_TASK_REQUEST, DELETE_TASK_SUCCESS, DELETE_TASK_FAILURE],
        `https://test.megapolis-it.ru/api/list/${id}`,
        {id}
        )
}

export function editTask(id: number, title: string) {
    return postRequest([EDIT_TASK_REQUEST, EDIT_TASK_SUCCESS, EDIT_TASK_FAILURE],
        `https://test.megapolis-it.ru/api/list/${id}`,
        {title}
    )
}

export function taskReducer(state=initialState, action: Action){
    switch (action.type) {
        case READ_TASK_REQUEST:
            return {
                ...state,
                processing: true,
                error: null
            };
        case READ_TASK_SUCCESS:
            return {
                ...state,
                processing: false,
                error: null,
                items: action.data.data,
                lastOperation: 'READ'
            };
        case READ_TASK_FAILURE:
            return {
                ...state,
                processing: false,
                error: action.error
            };
        case ADD_TASK_REQUEST:
            return {
                ...state,
                processing: true,
                error: null
            };
        case ADD_TASK_SUCCESS:
            return {
                ...state,
                items: [
                    ...state.items,
                    {id: action.data.id, title: action.payload.title}
                ],
                lastOperation: 'ADD'
            };
        case ADD_TASK_FAILURE:
            return {
                ...state,
                processing: false,
                error: action.error
            };
        case DELETE_TASK_REQUEST:
            return {
                ...state,
                processing: true,
                error: null
            };
        case DELETE_TASK_SUCCESS:
            return {
                ...state,
                processing: false,
                error: null,
                items: state.items.filter(item => item.id !== action.payload.id),
                lastOperation: 'DELETE'
            };
        case DELETE_TASK_FAILURE:
            return {
                ...state,
                processing: false,
                error: action.error
            };
        case EDIT_TASK_REQUEST:
            return {
                ...state,
                processing: true,
                error: null
            };
        case EDIT_TASK_SUCCESS:
            return {
                ...state,
                processing: false,
                error: null,
                lastOperation: 'EDIT'
            };
        case EDIT_TASK_FAILURE:
            return {
                ...state,
                processing: false,
                error: action.error
            };
        default:
            return state;
    }
}