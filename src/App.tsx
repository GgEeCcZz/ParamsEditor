import './styles/App.css'
import React, { PureComponent, useRef } from 'react';

interface Param {
    id: number;
    name: string;
    type: string;
}

interface ParamValue {
    paramId: number;
    value: string;
}

interface Color {
    id: number;
    name: string;
}

interface Model {
    paramValues: ParamValue[];
    colors: Color[];
}

interface Props {
    params: Param[];
    model: Model;
}

interface State {
    paramValues: ParamValue[];
}

class ParamEditor extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            paramValues: props.model.paramValues,
        };
    }

    handleInputChange = (paramId: number, value: string) => {
        console.log('Changing paramId:', paramId, 'to value:', value);
        const updatedParamValues = this.state.paramValues.map((pv) =>
            pv.paramId === paramId ? { ...pv, value } : pv
        );

        this.setState({ paramValues: updatedParamValues }, () => {
            console.log('Updated state:', this.state);
        });
    };

    // Метод для получения текущей модели
    getModel(): Model {
        return {
            paramValues: this.state.paramValues,
            colors: this.props.model.colors,
        };
    }

    render() {
        const {params} = this.props
        const {paramValues} = this.state

        console.log({
            params,
            paramValues,
        })

        const _params = {
            1: { id: 1, name: "Назначение", type: 'string' },
            2: { id: 2, name: "Длина", type: 'string' },
        }   // перепиши код для такой структуры данных чтобы убрать find и обращаться напрямую к нужным параметрам через params[1]

        return (
            <div className='container'>
                {params.map((param) => {
                    const currentValue = paramValues.find(
                        (pv) => pv.paramId === param.id
                    )?.value || '';

                    return (
                        <div key={param.id} className='child_container'>
                            <label>{param.name}:</label>
                            <input
                                type="text"
                                value={currentValue}
                                onChange={({target: {value}}) => this.handleInputChange(param.id, value)}
                            />
                        </div>
                    );
                })}
            </div>
        );
    }
}

const params: Param[] = [
    { id: 1, name: "Назначение", type: 'string' },
    { id: 2, name: "Длина", type: 'string' }
];

const model: Model = {
    paramValues: [
        { paramId: 1, value: "повседневное" },
        { paramId: 2, value: "макси" }
    ],
    colors: []
};

const App: React.FC = () => {
    const paramEditorRef = useRef<ParamEditor>(null);

    const handleGetModel = (): void => {
        if (paramEditorRef.current) {
            console.log(paramEditorRef.current.getModel());
        } else {
            console.error('ParamEditor ref is not set');
        }
    };

    return (
        <div>
            <h1>Редактор параметров</h1>
            <ParamEditor ref={paramEditorRef} params={params} model={model} />
            <button onClick={handleGetModel}>Получить модель</button>
        </div>
    );
};

export default App
